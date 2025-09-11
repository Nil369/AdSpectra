from fastapi import FastAPI
from fastapi.responses import JSONResponse
import uvicorn

app = FastAPI(
    title="AdSpecrtra API",
    description="API to predict the sales w.r.t a single & multiple features.",
    version="1.0.0",
    openapi_tags=[
        {
            "name": "AdSpecrtra",
            "description": "Operations related to prediction of the sales."
        }
    ]
)


@app.get('/')
def home():
    return JSONResponse(
        status_code=200, 
        content={
            'success': True,
            'message':'Welcome to AdSpecrtra API. Visit /docs for more info.'
        }
    )


# TODO: To develop the /predict endpoint



if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="localhost",
        port=8000,
        reload=True
    )