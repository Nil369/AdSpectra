import os
import joblib
import numpy as np
import pandas as pd
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from sklearn.model_selection import train_test_split

# Path to model.pkl
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")

try:
    model = joblib.load(MODEL_PATH)
except FileNotFoundError:
    print("Model file not found. Please ensure 'model.pkl' exists.")
    model = None

# Global metrics
model_r2 = None
model_mae = None
model_mse = None
model_rmse = None

if model is not None:
    # Load dataset for evaluation
    DATA_PATH = os.path.join(os.path.dirname(__file__), "advertising_budget_sales.csv")
    if os.path.exists(DATA_PATH):
        df = pd.read_csv(DATA_PATH)
        if "ID" in df.columns:
            df.drop("ID", axis=1, inplace=True)

        X = df.drop(columns=["Sales"])
        y = df["Sales"]

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        y_pred = model.predict(X_test)

        model_r2 = r2_score(y_test, y_pred)
        model_mae = mean_absolute_error(y_test, y_pred)
        model_mse = mean_squared_error(y_test, y_pred)
        model_rmse = np.sqrt(model_mse)


def predict_sales(input_data: dict):
    if model is None:
        raise ValueError("Model is not loaded.")

    features = [
        input_data["TV Ad Budget"],
        input_data["Radio Ad Budget"],
        input_data["Newspaper Ad Budget"],
    ]

    prediction = model.predict([features])[0]

    return {
        "prediction": float(prediction),
        "confidence_r2": (float(model_r2).__round__(4) * 100) if model_r2 else None,
        "mae": (float(model_mae).__round__(4) * 100) if model_mae else None,
        "mse": (float(model_mse).__round__(2) * 100) if model_mse else None,
        "rmse": (float(model_rmse).__round__(3) * 100) if model_rmse else None,
    }
