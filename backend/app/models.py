from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


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


class EnhancedQuestionInput(BaseModel):
    question: str = Field(..., description="The main question or issue to be resolved")
    machine_name: Optional[str] = Field(None, description="Name/tag of machine (e.g., 'Press #3')")
    machine_type: Optional[str] = Field(None, description="Type of machine (e.g., 'Press', 'Conveyor', 'Robot Arm')")
    manufacturer: Optional[str] = Field(None, description="Equipment manufacturer (e.g., 'Siemens', 'ABB', 'KUKA')")
    model_number: Optional[str] = Field(None, description="Specific model number of the equipment")
    component: Optional[str] = Field(None, description="Specific component involved (e.g., 'Motor', 'PLC', 'Sensor')")
    error_code: Optional[str] = Field(None, description="Machine/system error code")

    class Config:
        schema_extra = {
            "example": {
                "question": "Machine keeps stopping unexpectedly",
                "machine_name": "Press #3",
                "machine_type": "Hydraulic Press",
                "manufacturer": "Siemens",
                "component": "Pressure Sensor",
                "error_code": "E5023"
            }
        }


class SolutionInput(BaseModel):
    text: str = Field(..., description="The solution text")
    document_link: str = Field(..., description="Link to related documentation")
    verified: bool = Field(..., description="Whether the solution has been verified")
    error_code: str = Field(None, description="Machine/system error code")
    machine_name: str = Field(None, description="Name/tag of machine")
    machine_type: str = Field(None, description="Type of machine")
    manufacturer: str = Field(None, description="Equipment manufacturer")
    model_number: str = Field(None, description="Specific model number")
    component: str = Field(None, description="Component involved")
    resolution_type: ResolutionType = Field(None, description="Type of resolution")
    downtime_impact: DowntimeImpact = Field(None, description="Impact on machine downtime")
    safety_related: bool = Field(None, description="Whether the issue has safety implications")
    plant_name: str = Field(None, description="Name of the plant")
    department: str = Field(None, description="Department name")
    tags: str = Field(None, description="Comma-separated tags for filtering")

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
                "safety_related": True
            }
        }


class SolutionRequest(BaseModel):
    solution: SolutionInput
    question: str = Field(..., description="The original question this solution answers") 