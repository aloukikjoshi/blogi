from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.crud.user import get_user, update_user
from app.crud.post import get_posts_by_user
from app.schemas.user import User, UserUpdate
from app.schemas.post import PostList

router = APIRouter()

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=User)
async def update_user_me(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return update_user(db, current_user.id, user_update)

@router.get("/{user_id}", response_model=User)
async def read_user(user_id: str, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    return db_user

@router.get("/{user_id}/posts", response_model=PostList)
async def read_user_posts(
    user_id: str, 
    page: int = 1, 
    limit: int = 10,
    db: Session = Depends(get_db)
):
    skip = (page - 1) * limit
    posts = get_posts_by_user(db, user_id=user_id, skip=skip, limit=limit)
    return posts
