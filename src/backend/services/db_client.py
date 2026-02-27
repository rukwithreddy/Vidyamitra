from supabase import create_client, Client
import os

supabase_url = os.getenv("SUPABASE_URL", "")
supabase_key = os.getenv("SUPABASE_KEY", "")

supabase = None
try:
    if supabase_url and supabase_key and "your_" not in supabase_url:
        supabase = create_client(supabase_url, supabase_key)
    else:
        print("Warning: Supabase credentials are placeholders or missing. Please update .env")
except Exception as e:
    print("Error creating Supabase client:", e)