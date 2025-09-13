import joblib
import numpy as np
import pandas as pd


# Load the trained model
model = joblib.load("trained_model.pkl")

# Define a function to predict sales
def predict_sales(input_data):
    """
    input_data: dict or list/array of feature values in the order:
        ["TV Ad Budget", "Radio Ad Budget", "Newspaper Ad Budget"]
    
    Example:
        predict_sales([230.1, 37.8, 69.2])
        predict_sales({"TV Ad Budget": 230.1, "Radio Ad Budget": 37.8, "Newspaper Ad Budget": 69.2})
    """
    
    feature_names = ["TV Ad Budget", "Radio Ad Budget", "Newspaper Ad Budget"]

    if isinstance(input_data, dict):
        input_df = pd.DataFrame([input_data])
    else:
        input_array = np.array(input_data).reshape(1, -1)
        input_df = pd.DataFrame(input_array, columns=feature_names)
    
    prediction = model.predict(input_df)[0]
    return f"Predicted Sales: {prediction:.2f}"


print(predict_sales([230.1, 37.8, 69.2]))  # as list
print(predict_sales({
    "TV Ad Budget": 44.5,
    "Radio Ad Budget": 39.3,
    "Newspaper Ad Budget": 45.1
}))  # as dict


# In uv run jupyter notebooks like a module:
# python -m notebook