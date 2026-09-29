"""
Khet To Ghar - Python AI/ML Microservices Gateway
FastAPI server hosting:
1. /api/v1/ai/grade-crop        -> Computer Vision grading & Confidence Scoring
2. /api/v1/ai/predict-fair-price -> Mandi Benchmarks & Fair Price Guardrails
3. /api/v1/ai/demand-forecast   -> Facebook Prophet Time-Series Forecasting
4. /api/v1/ai/optimize-routes   -> Google OR-Tools Shared Logistics Batching
"""

from fastapi import FastAPI, File, UploadFile, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

from services.grading_service import grading_engine
from services.mandi_price_engine import price_engine
from services.demand_forecasting import forecast_engine
from services.route_optimizer import route_optimizer

app = FastAPI(
    title="Khet To Ghar - AI Intelligence Microservice",
    description="SIH 2026 Problem Statement 26033: Elimination of Middlemen with Vision Grading, Fair-Price Guardrails & Shared Logistics.",
    version="1.0.0"
)

# CORS configuration for Frontend & Node.js backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Request Models
class PriceGuardrailRequest(BaseModel):
    crop_name: str = Field(..., example="Red Onion")
    farmer_price: float = Field(..., example=28.0)
    grade: Optional[str] = Field("GRADE_A", example="GRADE_A")
    district: Optional[str] = Field("Nashik", example="Nashik")

class DemandForecastRequest(BaseModel):
    crop_name: str = Field(..., example="Hybrid Tomato")
    region: Optional[str] = Field("Maharashtra", example="Maharashtra")
    days: Optional[int] = Field(30, ge=7, le=90)

class RoutePoint(BaseModel):
    farmer_name: Optional[str] = None
    buyer_name: Optional[str] = None
    crop: Optional[str] = None
    quantity_kg: float
    lat: float
    lng: float
    address: Optional[str] = ""

class RouteOptimizationRequest(BaseModel):
    vehicle_capacity_kg: float = Field(..., example=3000.0)
    pickups: List[RoutePoint]
    dropoffs: List[RoutePoint]
    depot_location: Dict[str, float] = Field(default_factory=lambda: {"lat": 20.0059, "lng": 73.7904})

import os
from fastapi.responses import HTMLResponse

STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")

@app.get("/", response_class=HTMLResponse)
def serve_index():
    index_path = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_path):
        with open(index_path, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read())
    return HTMLResponse("<h1>Khet To Ghar API Gateway</h1><p>Visit <a href='/docs'>/docs</a> for Swagger documentation.</p>")

@app.get("/api/health")
def health_check():
    return {
        "service": "Khet To Ghar API Gateway & AI Microservice",
        "status": "HEALTHY",
        "version": "1.0.0",
        "problemStatement": "SIH 2026 - ID 26033: Elimination of Middlemen",
        "modules": [
            "Computer Vision Grading",
            "Mandi Price Intelligence & Guardrails",
            "Prophet Demand Forecasting",
            "OR-Tools Shared Routing"
        ]
    }

@app.post("/api/v1/ai/grade-crop")
async def grade_crop(
    image: UploadFile = File(...),
    claimed_grade: str = Form("UNGRADED")
):
    """
    Analyzes uploaded crop photo using Computer Vision.
    Returns: Assessed Grade (Grade A/B/C), Confidence Score %, and Fraud Mismatch flag.
    """
    if not image.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file must be a valid image (JPEG, PNG, WEBP)."
        )

    try:
        contents = await image.read()
        result = grading_engine.analyze_crop_image(contents, claimed_grade=claimed_grade)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Vision processing error: {str(e)}")

@app.post("/api/v1/ai/predict-fair-price")
def predict_fair_price(payload: PriceGuardrailRequest):
    """
    Calculates AI Recommended Fair Price against Agmarknet Mandi benchmarks
    and evaluates panic-sell or price-gouging guardrails.
    """
    try:
        guardrail_result = price_engine.evaluate_price_guardrail(
            crop_name=payload.crop_name,
            farmer_price=payload.farmer_price,
            grade=payload.grade,
            district=payload.district
        )
        return {"success": True, "data": guardrail_result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Price engine error: {str(e)}")

@app.post("/api/v1/ai/demand-forecast")
def get_demand_forecast(payload: DemandForecastRequest):
    """
    Returns a 30-60 day commodity demand forecast and sowing advisory.
    """
    try:
        forecast = forecast_engine.forecast_crop_demand(
            crop_name=payload.crop_name,
            region=payload.region,
            days=payload.days
        )
        return {"success": True, "data": forecast}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Forecast engine error: {str(e)}")

@app.post("/api/v1/ai/optimize-routes")
def optimize_routes(payload: RouteOptimizationRequest):
    """
    Google OR-Tools inspired Capacitated Vehicle Routing Problem for shared farm logistics.
    """
    try:
        plan = route_optimizer.optimize_shared_delivery_route(
            vehicle_capacity_kg=payload.vehicle_capacity_kg,
            pickups=[p.model_dump() for p in payload.pickups],
            dropoffs=[d.model_dump() for d in payload.dropoffs],
            depot_location=payload.depot_location
        )
        return {"success": True, "data": plan}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
