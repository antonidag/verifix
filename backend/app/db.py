from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, DateTime, JSON
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from datetime import datetime

# If you're using SQLite locally for testing:
SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}  # Only for SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Solution(Base):
    __tablename__ = "solutions"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    document_link = Column(String)
    verified = Column(Boolean, default=False)
    title = Column(String, default="")  # Adding title field
    description = Column(String, default="")
    solution_steps = Column(JSON, default=list)  #  # Correct way to define an array of strings
    confidence = Column(String, default="0")

    # Manufacturing context fields
    error_code = Column(String, index=True)           # Machine/system error code
    machine_name = Column(String, index=True)         # Name/tag of machine (e.g., "Press #3")
    machine_type = Column(String, index=True)         # "Press", "Conveyor", "Robot Arm"
    manufacturer = Column(String, index=True)         # e.g., "Siemens", "ABB", "KUKA"
    model_number = Column(String, index=True)         # Specific model
    component = Column(String, index=True)            # "Motor", "PLC", "Sensor"
    
    resolution_type = Column(String, index=True)      # "Preventive", "Corrective", "Calibration", "Software Fix"
    downtime_impact = Column(String, index=True)      # "High", "Medium", "Low" – helps prioritize
    safety_related = Column(Boolean, default=False)   # Flag if the issue has safety implications
    
    plant_name = Column(String, index=True)           # e.g., "Plant A", "Line 2"
    department = Column(String, index=True)           # e.g., "Welding", "Assembly", "Packaging"

    tags = Column(String)                      # Flexible filter e.g. ["overheat", "sensor fault"]
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def get_title(self) -> str:
        """Return a human-readable title for this solution."""
        return f"{self.manufacturer} {self.machine_name} {self.model_number}: {self.error_code}"

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    solution_id = Column(Integer, ForeignKey("solutions.id"))
    solution = relationship("Solution")

# Optional: For initializing tables
def init_db():
    Base.metadata.create_all(bind=engine)
