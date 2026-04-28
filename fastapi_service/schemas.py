from pydantic import BaseModel, Field
from typing import Optional

class PredictionInput(BaseModel):
    electricity_kwh: Optional[float] = None
    energy_usage_kwh: Optional[float] = Field(200.0, description="Monthly energy usage fallback")
    water_usage_liters: Optional[float] = Field(150.0, description="Daily water usage")
    waste_kg: Optional[float] = 0.0
    transport_mode: Optional[str] = "Bus"
    transport_km: Optional[float] = 0.0
    food_type: Optional[str] = "mixed"
    clothing_spend: Optional[float] = None
    consumption_spend: Optional[float] = None
    housing_type: Optional[str] = "Dormitory"

class PredictionResponse(BaseModel):
    predicted_co2: float
    national_avg: float
    campus_avg: float
    comparison_pct: float
    carbon_level: dict
    recommendations: list
