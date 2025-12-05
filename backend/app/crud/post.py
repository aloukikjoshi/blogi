from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.post import Post, Tag
from app.schemas.post import PostCreate, PostUpdate
import re
from datetime import datetime
from uuid import uuid4

def get_post(db: Session, post_id: str):
    return db.query(Post).filter(Post.id == post_id).first()

def get_posts(db: Session, skip: int = 0, limit: int = 100):
    total = db.query(func.count(Post.id)).scalar()
    posts = db.query(Post).order_by(Post.published_at.desc()).offset(skip).limit(limit).all()
    return {
        "items": posts,
        "total": total,
        "page": skip // limit + 1,
        "size": limit,
        "pages": (total + limit - 1) // limit
    }

def get_posts_by_user(db: Session, user_id: str, skip: int = 0, limit: int = 100):
    total = db.query(func.count(Post.id)).filter(Post.author_id == user_id).scalar()
    posts = db.query(Post).filter(Post.author_id == user_id).order_by(Post.published_at.desc()).offset(skip).limit(limit).all()
    return {
        "items": posts,
        "total": total,
        "page": skip // limit + 1,
        "size": limit,
        "pages": (total + limit - 1) // limit
    }

def search_posts(db: Session, query: str, skip: int = 0, limit: int = 100):
    search = f"%{query}%"
    total = db.query(func.count(Post.id)).filter(
        (Post.title.ilike(search)) | 
        (Post.content.ilike(search))
    ).scalar()
    
    posts = db.query(Post).filter(
        (Post.title.ilike(search)) | 
        (Post.content.ilike(search))
    ).order_by(Post.published_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "items": posts,
        "total": total,
        "page": skip // limit + 1,
        "size": limit,
        "pages": (total + limit - 1) // limit
    }

def create_post(db: Session, post: PostCreate, user_id: str):
    # Process tags
    tag_objects = []
    if post.tags:
        for tag_name in post.tags:
            tag = db.query(Tag).filter(Tag.name == tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.add(tag)
            tag_objects.append(tag)
    
    db_post = Post(
        title=post.title,
        content=post.content,
        excerpt=post.excerpt if post.excerpt else post.content[:150] + "...",
        cover_image=post.cover_image,
        author_id=user_id,
        published_at=datetime.utcnow()
    )
    
    if tag_objects:
        db_post.tags = tag_objects
    
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def update_post(db: Session, post_id: str, post_update: PostUpdate, user_id: str):
    db_post = get_post(db, post_id)
    
    if db_post is None or db_post.author_id != user_id:
        return None
    
    update_data = post_update.dict(exclude_unset=True)
    
    # Update tags if needed
    if "tags" in update_data:
        tag_objects = []
        for tag_name in update_data["tags"]:
            tag = db.query(Tag).filter(Tag.name == tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.add(tag)
            tag_objects.append(tag)
        
        db_post.tags = tag_objects
        update_data.pop("tags")
    
    # Update the fields
    for field, value in update_data.items():
        setattr(db_post, field, value)
    
    # The updated_at field will be automatically updated by SQLAlchemy
    # due to onupdate=func.now() in the model
    
    db.commit()
    db.refresh(db_post)
    return db_post

def delete_post(db: Session, post_id: str, user_id: str):
    print(f"Attempting to delete post {post_id} by user {user_id}")
    
    try:
        db_post = db.query(Post).filter(Post.id == post_id).first()
        
        if not db_post:
            print(f"Post {post_id} not found")
            return False
        
        # retrieve the author_id as a scalar value to avoid SQLAlchemy ColumnElement comparisons in Python conditionals
        db_author_id = db.query(Post.author_id).filter(Post.id == post_id).scalar()
        if db_author_id != user_id:
            print(f"User {user_id} is not the author of post {post_id}. Author is {db_author_id}")
            return False
        
        print(f"Deleting post {post_id}")
        db.delete(db_post)
        db.commit()
        return True
    except Exception as e:
        print(f"Error deleting post: {str(e)}")
        db.rollback()
        raise e
