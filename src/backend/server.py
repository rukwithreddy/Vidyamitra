from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()
from services.db_client import supabase

from routes import login,register,logout,profile,resume_upload,domain_switch

app=FastAPI()
app.add_middleware( CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
app.include_router(login.router)
app.include_router(register.router)
app.include_router(logout.router)
app.include_router(resume_upload.router)
app.include_router(profile.router)
app.include_router(domain_switch.router)
@app.get("/")
def read_root():
    return {"message": "Welcome to the VidyaMitra API!"}