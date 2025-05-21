from sqlalchemy import create_engine,Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import sessionmaker, declarative_base, relationship


# If you're using SQLite locally for testing:
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# If you use Postgres or another DB, modify accordingly:
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/dbname"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}  # Only for SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Import your models (you may need to move these into this file)
class Solution(Base):
    __tablename__ = "solutions"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    document_link = Column(String)
    verified = Column(Boolean, default=False)

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    solution_id = Column(Integer, ForeignKey("solutions.id"))
    verified = Column(Boolean, default=False)

    solution = relationship("Solution")

# Optional: For initializing tables
def init_db():
    Base.metadata.create_all(bind=engine)
