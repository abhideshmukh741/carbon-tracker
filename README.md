# AI-Based Carbon Footprint Analysis and Prediction

This project is structured as a modern microservices application, comprising a React frontend, a FastAPI machine learning prediction service, and a Django backend for analytics and user data.

## How to Run Locally

If you don't have Docker installed, you can run the services by opening **three separate terminal windows** inside the project folder (`c:\Users\Mayur\Downloads\mejor_project`):

### Terminal 1: Run the ML Prediction API (FastAPI)
```pwsh
cd fastapi_service
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```
This service loads your `carbon_model.pkl` and handles prediction requests.

### Terminal 2: Run the Application API (Django)
```pwsh
cd django_backend
python manage.py runserver 0.0.0.0:8001
```
This service handles authentication, manages user history with a local SQLite database, and computes dashboard metrics.

### Terminal 3: Run the Web UI (React/Vite)
```pwsh
cd frontend
npm run dev
```
Navigate to `http://localhost:5173/` in your browser to view the application!

---

## How to Run using Docker (Production-ready)
If you have **Docker Desktop** installed on Windows:
Just open a single terminal in the root folder and run:
```pwsh
docker-compose up -d --build
```
Your application will then be live at `http://localhost:80`.
