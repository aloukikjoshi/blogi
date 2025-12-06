from typing import Optional
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash, verify_password

def get_user(
    db: Session,
    *,
    user_id: Optional[str] = None,
    email: Optional[str] = None,
    username: Optional[str] = None,
):
    provided_filters = [param is not None for param in (user_id, email, username)]
    if not any(provided_filters):
        raise ValueError("At least one identifier must be provided to get_user")

    query = db.query(User)
    if user_id is not None:
        query = query.filter(User.id == user_id)
    if email is not None:
        query = query.filter(User.email == email)
    if username is not None:
        query = query.filter(User.username == username)

    return query.first()

def create_user(db: Session, user: UserCreate):
    try:
        hashed_password = get_password_hash(user.password)
        db_user = User(
            email=user.email,
            username=user.username,
            avatar=user.avatar,  # Make sure this field exists in your model
            hashed_password=hashed_password
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        print(f"Error creating user: {str(e)}")
        db.rollback()
        raise e

def update_user(db: Session, user_id: str, user: UserUpdate):
    db_user = get_user(db, user_id=user_id)
    if not db_user:
        return None
    
    update_data = user.dict(exclude_unset=True)
    
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
    
    for field, value in update_data.items():
        setattr(db_user, field, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username=username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user
