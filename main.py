from fastapi import FastAPI
from pydantic import BaseModel
from static_analysis import check_syntax
from ai_suggestion import suggest_fix
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body model
class CodeInput(BaseModel):
    code: str

# Response model
class AnalysisResponse(BaseModel):
    error: str = None
    suggestion: str = None

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_code(input_data: CodeInput):
    code = input_data.code
    error = check_syntax(code)
    if error:
        suggestion = suggest_fix(error, code)
        return AnalysisResponse(error=error, suggestion=suggestion)
    return AnalysisResponse(suggestion="No issues detected.")

@app.get("/")
async def root():
    return {"message": "Welcome to the Smart Debugging Assistant API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
