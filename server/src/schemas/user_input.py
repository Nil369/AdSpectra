from pydantic import BaseModel

class UserInputSchema(BaseModel):
    TV_Ad_Budget: float
    Radio_Ad_Budget: float
    Newspaper_Ad_Budget: float