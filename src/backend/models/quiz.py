from pydantic import BaseModel, Field
from typing import List, Dict, Any
from pydantic import BaseModel, Field
from typing import List
class MCQOption(BaseModel):
    key: str = Field(..., description="Option keylike A, B, C, D")
    text: str = Field(..., description="Option text")
class MCQQuestion(BaseModel):
    question: str = Field(..., description="The quiz question")
    options: List[MCQOption] = Field(...,description="List of options for the question")
    correct_answer: str = Field(...,description="Correct option key (A/B/C/D)")
    explanation: str = Field(...,description="Explanation for the correct answer")
class QuizLLMResponse(BaseModel):
    questions: List[MCQQuestion] = Field(..., min_items=10, max_items=10)