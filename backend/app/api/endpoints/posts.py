from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import Optional
import shutil
import os
from uuid import uuid4

from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.crud.post import get_post, get_post_by_slug, get_posts, create_post, update_post, delete_post, search_posts
from app.schemas.post import Post, PostCreate, PostUpdate, PostList
from app.schemas.user import User

router = APIRouter()

@router.get("/", response_model=PostList)
async def read_posts(
    page: int = 1, 
    limit: int = 10, 
    db: Session = Depends(get_db)
):
    skip = (page - 1) * limit
    posts = get_posts(db, skip=skip, limit=limit)
    return posts

@router.get("/search", response_model=PostList)
async def search_posts_endpoint(
    q: str,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    skip = (page - 1) * limit
    posts = search_posts(db, query=q, skip=skip, limit=limit)
    return posts

@router.post("/", response_model=Post, status_code=status.HTTP_201_CREATED)
async def create_post_endpoint(
    post: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_post(db=db, post=post, user_id=current_user.id)

@router.get("/{id_or_slug}", response_model=Post)
async def read_post(id_or_slug: str, db: Session = Depends(get_db)):
    # Try to find by ID first
    post = get_post(db, post_id=id_or_slug)
    
    # If not found, try by slug
    if post is None:
        post = get_post_by_slug(db, slug=id_or_slug)
    
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Post not found"
        )
    return post

@router.patch("/{post_id}", response_model=Post)
async def update_post_endpoint(
    post_id: str,
    post_update: PostUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    updated_post = update_post(db, post_id=post_id, post_update=post_update, user_id=current_user.id)
    if updated_post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found or you don't have permission to update it"
        )
    return updated_post

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post_endpoint(
    post_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    success = delete_post(db, post_id=post_id, user_id=current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found or you don't have permission to delete it"
        )
