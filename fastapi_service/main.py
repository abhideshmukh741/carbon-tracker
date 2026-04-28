import os
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import PredictionInput, PredictionResponse
from pydantic import ValidationError

app = FastAPI(title="Carbon Footprint Prediction API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production should restrict this to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
# Using relative path from fastapi container which we expect to have /ml_model mounted
# For local run without container, we navigate back
MODEL_PATH = os.environ.get("MODEL_PATH", os.path.join(os.path.dirname(__file__), '..', 'ml_model', 'carbon_model.pkl'))
model = None

@app.on_event("startup")
def load_model():
    global model
    try:
        model = joblib.load(MODEL_PATH)
        print(f"[OK] Model loaded successfully from {MODEL_PATH}")
    except Exception as e:
        print(f"[ERROR] Error loading model: {e}")

def transport_flags(data: PredictionInput):
    t = str(data.transport_mode or 'Bus').strip().lower()
    if t in ('car', '3'):
        return True, False, 'Car'
    if t in ('bus', '1', 'public_transport'):
        return False, True, 'Bus'
    if t in ('bike', 'bicycle', '2'):
        return False, False, 'Bike'
    if t in ('walk', 'walking', '0'):
        return False, False, 'Walk'
    return False, True, 'Bus'

def prepare_features(data: PredictionInput):
    if data.electricity_kwh is not None:
        energy = float(data.electricity_kwh) * 30.0
    else:
        energy = float(data.energy_usage_kwh)
    energy = max(0.0, min(energy, 15000.0))

    water = max(0.0, min(data.water_usage_liters, 1000.0))

    ft = str(data.food_type).lower()
    if ft in ('veg', 'vegetarian', '0'):
        clothing, consumption = 900.0, 2800.0
    elif ft in ('non_veg', 'non-veg', 'nonveg', '2'):
        clothing, consumption = 1200.0, 4200.0
    else:
        clothing, consumption = 1050.0, 3400.0

    if data.clothing_spend is not None:
        clothing = data.clothing_spend
    if data.consumption_spend is not None:
        consumption = data.consumption_spend

    housing = data.housing_type or 'Dormitory'

    transport_car, transport_public, _ = transport_flags(data)

    resource_usage = int(energy * water)
    housing_dormitory = housing == 'Dormitory'
    housing_own_house = housing == 'Own_House'
    housing_shared_house = housing == 'Shared_House'
    housing_sum = int(housing_dormitory) + int(housing_own_house) + int(housing_shared_house)
    energy_house = int(energy * housing_sum)

    transport_sum = int(transport_car) + int(transport_public)
    transport_impact = int(consumption * transport_sum)

    return pd.DataFrame([{
        'Clothing_Spend_per_Month': int(clothing),
        'Energy_Usage_kWh_per_Month': int(energy),
        'Water_Usage_Liters_per_Day': int(water),
        'Consumption_Spend_per_Month': int(consumption),
        'Resource_Usage': resource_usage,
        'Housing_Type_Dormitory': housing_dormitory,
        'Housing_Type_Own_House': housing_own_house,
        'Housing_Type_Shared_House': housing_shared_house,
        'Energy_House': energy_house,
        'Transportation_Mode_Car': transport_car,
        'Transportation_Mode_Public_Transport': transport_public,
        'Transport_Impact': transport_impact,
    }])

def get_carbon_level(co2_kg: float):
    if co2_kg < 150:
        return {'level': 'Excellent', 'color': '#10b981', 'icon': '🌿', 'message': 'Very low carbon footprint! Keep it up!'}
    elif co2_kg < 250:
        return {'level': 'Good', 'color': '#3b82f6', 'icon': '✅', 'message': 'Below average carbon footprint. Well done!'}
    elif co2_kg < 350:
        return {'level': 'Moderate', 'color': '#f59e0b', 'icon': '⚠️', 'message': 'Average carbon footprint. Room for improvement.'}
    elif co2_kg < 500:
        return {'level': 'High', 'color': '#f97316', 'icon': '🔶', 'message': 'High carbon footprint. Consider lifestyle changes.'}
    else:
        return {'level': 'Critical', 'color': '#ef4444', 'icon': '🔴', 'message': 'Very high carbon footprint. Immediate action needed!'}

def get_recommendations(data: PredictionInput, co2_kg: float):
    recs = []
    _, _, transport = transport_flags(data)
    
    energy = float(data.electricity_kwh * 30.0) if data.electricity_kwh is not None else float(data.energy_usage_kwh)
    water = float(data.water_usage_liters)
    waste = float(data.waste_kg or 0)
    km = float(data.transport_km or 0)
    food = str(data.food_type).lower()

    if transport == 'Car':
        recs.append({'icon': '🚌', 'text': 'Switch to public transport to reduce emissions by up to 30%', 'impact': 'High'})
        recs.append({'icon': '🚲', 'text': 'Use a bicycle for short distances on campus', 'impact': 'Medium'})
    elif transport == 'Bus':
        recs.append({'icon': '🚲', 'text': 'Consider cycling for shorter distances when possible', 'impact': 'Medium'})
    elif transport in ('Walk', 'Bike'):
        recs.append({'icon': '🚶', 'text': 'Active travel keeps emissions low', 'impact': 'Low'})
    
    if km > 25:
        recs.append({'icon': '📍', 'text': 'High daily distance—combine trips or carpool', 'impact': 'High'})
    if food in ('non_veg', 'non-veg', 'nonveg', '2'):
        recs.append({'icon': '🥗', 'text': 'Try more plant-based meals to lower diet-related emissions', 'impact': 'Medium'})
    if waste > 1.5:
        recs.append({'icon': '♻️', 'text': 'Reduce single-use items and segregate waste', 'impact': 'Medium'})
    if energy > 300:
        recs.append({'icon': '💡', 'text': 'Reduce electricity usage — turn off lights and AC', 'impact': 'High'})
    if water > 200:
        recs.append({'icon': '💧', 'text': 'Reduce water consumption — fix leaks', 'impact': 'Medium'})
    
    recs.append({'icon': '🌱', 'text': 'Participate in campus tree plantation drives', 'impact': 'Low'})
    
    return recs[:5]

@app.post("/predict", response_model=PredictionResponse)
def predict(data: PredictionInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded")
    
    try:
        features = prepare_features(data)
        prediction = float(model.predict(features)[0])
        prediction = max(0, prediction)
        
        level = get_carbon_level(prediction)
        recs = get_recommendations(data, prediction)
        
        return PredictionResponse(
            predicted_co2=round(prediction, 2),
            national_avg=292.0,
            campus_avg=267.0,
            comparison_pct=round(((prediction - 292.0) / 292.0) * 100, 1),
            carbon_level=level,
            recommendations=recs
        )
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": model is not None,
    }
