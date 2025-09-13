FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy rest of application code
COPY . .

# ✅ Set PYTHONPATH so Python can find src/
ENV PYTHONPATH=/app/src

# Expose the application port
EXPOSE 8000

# Run the app
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
