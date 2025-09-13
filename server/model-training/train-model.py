import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
import joblib

MODEL_PATH = "trained_model.pkl"

# Load the dataset
try:
    df = pd.read_csv("advertising_budget_sales.csv")
    df.drop("ID", axis=1, inplace=True)
    # Features & Target
    X = df.drop(columns=["Sales"])
    y = df["Sales"]

    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


    # Train OR Load Model
    if not os.path.exists(MODEL_PATH):
        print("⚡ Training new model...")

        # Train the model using a pipeline
        model = Pipeline([
            ('scaler', StandardScaler()),
            ('regressor', RandomForestRegressor(random_state=42))
        ])

        model.fit(X_train, y_train)

        # Save the trained model
        joblib.dump(model, MODEL_PATH)
        print(f"✅ Model trained and saved to {MODEL_PATH}")
        
    else:
        print("📂 Found existing model. Loading...")
        model = joblib.load(MODEL_PATH)


    y_pred = model.predict(X_test)
    test_r2 = r2_score(y_test, y_pred)
    print(f"🎯 Accuracy of model: {(test_r2 * 100):.2f}%")

except FileNotFoundError:
    print("Dataset Not found!")