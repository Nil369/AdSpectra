import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from models.models import model, predict_sales, model_r2, model_mae, model_mse, model_rmse
from schemas.user_input import UserInputSchema


app = FastAPI(
    title="AdSpectra API",
    description="API to predict the sales w.r.t a single & multiple features.",
    version="1.0.0",
    openapi_tags=[
        {
            "name": "AdSpectra",
            "description": "Operations related to prediction of the sales."
        }
    ]
)


@app.get('/')
def home():
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "message": "Welcome to AdSpectra API - By Akash Halder.",
            "docs": "Vist /docs or /redoc for API documentation."
        }
    )


@app.post("/predict", tags=["AdSpectra"])
def predict(request: UserInputSchema):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not available. Please train the model first.")

    input_data = {
        "TV Ad Budget": request.TV_Ad_Budget,
        "Radio Ad Budget": request.Radio_Ad_Budget,
        "Newspaper Ad Budget": request.Newspaper_Ad_Budget,
    }

    prediction = predict_sales(input_data)

    return {
        "success": True,
        "input": input_data,
        "prediction": prediction
    }


@app.get("/analytics", tags=["AdSpectra"])
def analytics():
    if model is None:
        raise HTTPException(status_code=500, detail="Model not available. Please train the model first.")

    return {
        "success": True,
        "metrics": {
            "model_accuracy": model_r2.__round__(4) * 100,
            "mae": model_mae.real.__round__(4) * 100,
            "mse": model_mse.__round__(2) * 100,
            "rmse": model_rmse.__round__(2) * 100
        }
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="localhost",
        port=8000,
        reload=True
    )
