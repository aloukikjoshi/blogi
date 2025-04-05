from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from uuid import uuid4
from datetime import datetime
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid4()))
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    name = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    posts = relationship("Post", back_populates="author")
