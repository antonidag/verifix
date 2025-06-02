from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class LinkModel(BaseModel):
    title: str = Field(..., description="Title of the link")
    url: str = Field(..., description="URL of the link")

class QuestionInput(BaseModel):
    question: str = Field(..., description="The question to be asked")

class AskRequestModel(BaseModel):
    question: str = Field(..., description="The main question or issue to be resolved")
    image_data: Optional[str] = Field(None, description="Optional base64 encoded image data")

    class Config:
        json_schema_extra = {
            "example": {
                "question": "Machine keeps stopping unexpectedly",
            }
        }

class SolutionModel(BaseModel):
    id: Optional[str] = Field(None, description="The solution id")
    text: str = Field(..., description="The solution text")
    confidence: Optional[str] = Field("", description="Confidence of the solution")
    title: Optional[str] = Field("", description="Title of the solution")
    description: Optional[str] = Field("", description="Description of the solution")
    solution_steps: Optional[List[str]] = Field(default_factory=list, description="List of solution steps")
    status: Optional[str] = Field("analyzing", description="Current status of the investigation: analyzing, processing, identifying, validating, storing, complete, or error")
    verified: bool = Field(False, description="Whether the solution has been verified")
    error_code: Optional[str] = Field("", description="Machine/system error code")
    machine_name: Optional[str] = Field("", description="Name/tag of machine")
    machine_type: Optional[str] = Field("", description="Type of machine")
    manufacturer: Optional[str] = Field("", description="Equipment manufacturer")
    model_number: Optional[str] = Field("", description="Specific model number")
    component: Optional[str] = Field("", description="Component involved")
    resolution_type: Optional[str] = Field(None, description="Type of resolution")
    downtime_impact: Optional[str] = Field(None, description="Impact on machine downtime")
    tags: Optional[List[str]] = Field(default_factory=list, description="Tags for filtering")
    links: Optional[List[LinkModel]] = Field(default_factory=list, description="Links to related documentation and resources")
    inventory_id: Optional[str] = Field(None, description="ID of the associated inventory item")
    created_at: Optional[datetime] = Field(None, description="Creation date of the solution")
    updated_at: Optional[datetime] = Field(None, description="Last update date of the solution")

    class Config:
        json_schema_extra = {
            "example": {
                "text": "Replace the pressure sensor and recalibrate the system",
                "verified": True,
                "error_code": "E5023",
                "machine_name": "Press #3",
                "machine_type": "Hydraulic Press",
                "manufacturer": "Siemens",
                "component": "Pressure Sensor",
                "resolution_type": "Corrective",
                "downtime_impact": "High",
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
    solution: dict = Field(..., example={"id": "abc123"})

    class Config:
        json_schema_extra = {
            "example": {
                "message": "Solution added successfully",
                "solution": {
                    "id": "abc123"
                }
            }
        }

class QuestionModel(BaseModel):
    id: str
    text: str
    solution_id: Optional[str] = None
    created_at: Optional[datetime] = None
    embedding: Optional[List[float]] = None

    class Config:
        json_schema_extra = {
            "example": {
                "id": "q123",
                "text": "How to fix error E5023?",
                "solution_id": "abc123",
                "created_at": "2024-05-28T10:30:00Z"
            }
        }

class Match(BaseModel):
    solution_id: str
    score: float

    class Config:
        json_schema_extra = {
            "example": {
                "solution_id": "abc123",
                "score": 0.95
            }
        }

class AskResponseModel(BaseModel):
    matches: List[Match]

    class Config:
        json_schema_extra = {
            "example": {
                "matches": [
                    {
                        "solution_id": "abc123",
                        "score": 0.95,
                    },
                    {
                        "solution_id": "def456",
                        "score": 0.85,
                    }
                ]
            }
        }

class ChatResponseModel(BaseModel):
    message: str

    class Config:
        json_schema_extra = {
            "example": {
                "message": "Based on the available solutions, I recommend..."
            }
        }

class InventoryBase(BaseModel):
    manufacturer: str = Field(..., description="Equipment manufacturer (e.g., 'Siemens', 'ABB')")
    model_name: str = Field(..., description="Model name/number of the equipment")
    component_type: str = Field(..., description="Type of component (e.g., 'PLC', 'Robot', 'Drive')")
    firmware_version: Optional[str] = Field(None, description="Firmware/software version if applicable")
    specifications: Optional[dict] = Field(default_factory=dict, description="Technical specifications")
    metadata: Optional[dict] = Field(default_factory=dict, description="Additional metadata like installation date, service history")
    created_at: Optional[datetime] = Field(None, description="Creation date of the solution")
    updated_at: Optional[datetime] = Field(None, description="Last update date of the solution")

    class Config:
        json_schema_extra = {
            "example": {
                "solution_id": "abc123",
                "manufacturer": "Siemens",
                "model_name": "SIMATIC S7-1500",
                "component_type": "PLC",
                "firmware_version": "V2.9.2",
                "specifications": {
                    "cpu_type": "1516-3 PN/DP",
                    "memory": "5MB work, 32MB load",
                    "interfaces": ["PROFINET", "PROFIBUS"]
                },
                "metadata": {
                    "installation_date": "2024-01-15",
                    "last_service": "2025-05-01",
                    "service_contract": "SLA-12345"
                }
            }
        }

class InventoryCreate(InventoryBase):
    pass

class Inventory(InventoryBase):
    id: str = Field(..., description="Unique identifier for the inventory item")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")