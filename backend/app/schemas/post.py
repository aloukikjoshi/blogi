from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel
from app.schemas.user import User

class TagBase(BaseModel):
    name: str

class Tag(TagBase):
    class Config:
        orm_mode = True

class PostBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    tags: Optional[List[str]] = []

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    tags: Optional[List[str]] = None

class PostInDB(PostBase):
    id: str
    slug: str
    published_at: datetime
    author_id: str
    
    class Config:
        orm_mode = True

class Post(PostInDB):
    author: User
    tags: List[Tag] = []
    
    class Config:
        orm_mode = True

class PostList(BaseModel):
    items: List[Post]
    total: int
    page: int
    size: int
    pages: int
