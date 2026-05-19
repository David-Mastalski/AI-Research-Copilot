from pydantic import BaseModel
from typing import List

class AnalysisResponse(BaseModel):
    summary: str
    key_points: List[str]
    insights: List[str]