from sqlalchemy import Column, String, Text, ForeignKey, DateTime, Table
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from uuid import uuid4
from app.core.database import Base

# Many-to-many relationship for posts and tags
post_tag = Table(
    "post_tags",
    Base.metadata,
    Column("post_id", String, ForeignKey("posts.id")),
    Column("tag_name", String, ForeignKey("tags.name"))
)

class Tag(Base):
    __tablename__ = "tags"
    
    name = Column(String, primary_key=True)
    posts = relationship("Post", secondary=post_tag, back_populates="tags")

class Post(Base):
    __tablename__ = "posts"

    id = Column(String, primary_key=True, default=lambda: str(uuid4()))
    title = Column(String, index=True)
    content = Column(Text)
    excerpt = Column(String, nullable=True)
    cover_image = Column(String, nullable=True)
    published_at = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Foreign Keys
    author_id = Column(String, ForeignKey("users.id"))
    
    # Relationships
    author = relationship("User", back_populates="posts")
    tags = relationship("Tag", secondary=post_tag, back_populates="posts")
