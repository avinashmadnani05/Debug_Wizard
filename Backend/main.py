from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from static_analysis import check_syntax
from ai_suggestion import suggest_fix
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Update allowed origins to include local development and your Vercel frontend
origins = [
    "http://localhost:3000",
    "https://debug-wizard.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Connect to MongoDB Atlas ---
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise Exception("MONGO_URI is not set in .env")
client = AsyncIOMotorClient(MONGO_URI)
db = client["smart_debugger"]  # use your database name here
history_collection = db["analysis_history"]
feedback_collection = db["feedbacks"]

# --- Request/Response Models ---
class CodeInput(BaseModel):
    code: str

class AnalysisResponse(BaseModel):
    error: Optional[str] = None
    suggestion: Optional[str] = None

# Model for storing history items
class AnalysisHistoryItem(BaseModel):
    code: str
    error: Optional[str] = None
    suggestion: Optional[str] = None

# Model for feedback submissions
class FeedbackInput(BaseModel):
    code: str
    feedback: str
    rating: int  # Rating from 1 to 5

# --- Endpoints ---
@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_code(input_data: CodeInput):
    code = input_data.code
    error = check_syntax(code)
    if error:
        suggestion = suggest_fix(error, code)
    else:
        suggestion = "No issues detected."
    
    # Create a history item and store in MongoDB
    analysis_item = AnalysisHistoryItem(code=code, error=error, suggestion=suggestion)
    await history_collection.insert_one(analysis_item.dict())
    return AnalysisResponse(error=error, suggestion=suggestion)

@app.get("/history", response_model=List[AnalysisHistoryItem])
async def get_history():
    items = []
    async for doc in history_collection.find():
        doc.pop("_id", None)  # Remove MongoDB internal _id field if not needed
        items.append(doc)
    return items

@app.post("/feedback")
async def submit_feedback(feedback_input: FeedbackInput):
    await feedback_collection.insert_one(feedback_input.dict())
    return {"message": "Feedback submitted successfully."}

@app.get("/feedback", response_model=List[FeedbackInput])
async def get_feedback():
    items = []
    async for doc in feedback_collection.find():
        doc.pop("_id", None)
        items.append(doc)
    return items

@app.get("/")
async def root():
    return {"message": "Welcome to the Smart Debugging Assistant API!"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
