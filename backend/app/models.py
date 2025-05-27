from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum
from datetime import datetime


class ResolutionType(str, Enum):
    PREVENTIVE = "Preventive"
    CORRECTIVE = "Corrective"
    CALIBRATION = "Calibration"
    SOFTWARE_FIX = "Software Fix"


class DowntimeImpact(str, Enum):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class QuestionInput(BaseModel):
    question: str = Field(..., description="The question to be asked")

class SolutionPartModel(BaseModel):
    machine_name: Optional[str] = Field(None, description="Name/tag of machine (e.g., 'Press #3')")
    machine_type: Optional[str] = Field(None, description="Type of machine (e.g., 'Press', 'Conveyor', 'Robot Arm')")
    manufacturer: Optional[str] = Field(None, description="Equipment manufacturer (e.g., 'Siemens', 'ABB', 'KUKA')")
    model_number: Optional[str] = Field(None, description="Specific model number of the equipment")
    component: Optional[str] = Field(None, description="Specific component involved (e.g., 'Motor', 'PLC', 'Sensor')")
    error_code: Optional[str] = Field(None, description="Machine/system error code")
class AskRequestModel(BaseModel):
    question: str = Field(..., description="The main question or issue to be resolved")
    solution: Optional[SolutionPartModel] = Field(None, description="Optional solution details")

    class Config:
        schema_extra = {
            "example": {
                "question": "Machine keeps stopping unexpectedly",
                "solution": {
                    "machine_name": "Press #3",
                    "machine_type": "Hydraulic Press",
                    "manufacturer": "Siemens",
                    "component": "Pressure Sensor",
                    "error_code": "E5023"
                }
            }
        }


class SolutionModel(BaseModel):
    id: Optional[int] = Field(None, description="The solution id")
    text: str = Field(..., description="The solution text")
    document_link: Optional[str] = Field("", description="Link to related documentation")
    verified: bool = Field(..., description="Whether the solution has been verified")
    error_code: Optional[str] = Field("", description="Machine/system error code")
    machine_name: Optional[str] = Field("", description="Name/tag of machine")
    machine_type: Optional[str] = Field("", description="Type of machine")
    manufacturer: Optional[str] = Field("", description="Equipment manufacturer")
    model_number: Optional[str] = Field("", description="Specific model number")
    component: Optional[str] = Field("", description="Component involved")
    resolution_type: Optional[str] = Field(None, description="Type of resolution")
    downtime_impact: Optional[str] = Field(None, description="Impact on machine downtime")
    safety_related: Optional[bool] = Field(False, description="Whether the issue has safety implications")
    plant_name: Optional[str] = Field("", description="Name of the plant")
    department: Optional[str] = Field("", description="Department name")
    tags: Optional[str] = Field("", description="Comma-separated tags for filtering")
    title: Optional[str] = Field("", description="Title of the solution")
    description: Optional[str] = Field("", description="Description of the solution")
    solution_steps: Optional[List[str]] = Field(default_factory=list, description="List of solution steps")
    confidence: Optional[str] = Field("", description="Confidence of the solution")

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "text": "Replace the pressure sensor and recalibrate the system",
                "document_link": "https://docs.example.com/solutions/5023",
                "verified": True,
                "error_code": "E5023",
                "machine_name": "Press #3",
                "machine_type": "Hydraulic Press",
                "manufacturer": "Siemens",
                "component": "Pressure Sensor",
                "resolution_type": "Corrective",
                "downtime_impact": "High",
                "safety_related": True,
                "description": "Issue with pressure sensor readings",
                "solution_steps": [
                    "1. Power down the system",
                    "2. Remove the faulty sensor",
                    "3. Install the new sensor",
                    "4. Calibrate the system"
                ]
            }
        }


class SolutionRequest(BaseModel):
    solution: SolutionModel
    question: str = Field(..., description="The original question this solution answers")


class SolutionResponseModel(BaseModel):
    message: str
    solution: dict = Field(..., example={"id": 1})

    class Config:
        schema_extra = {
            "example": {
                "message": "Solution added successfully",
                "solution": {
                    "id": 1
                }
            }
        }


class QuestionModel(BaseModel):
    id: int
    text: str
    solution_id: Optional[int] = None

    class Config:
        orm_mode = True


class Match(BaseModel):
    solution_id: int
    score: float

    class Config:
        orm_mode = True


class AskResponseModel(BaseModel):
    match: Optional[Match] = None

    class Config:
        orm_mode = True 

class ChatResponseModel(BaseModel):
    message: str

    class Config:
        schema_extra = {
            "example": {
                "message": "Hello, world!"
            }
        }