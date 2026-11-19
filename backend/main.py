from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import get_supabase

app = FastAPI(title="Silk Beauty API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase = get_supabase()


@app.get("/api/services")
def get_services():
    # Получаем все услуги
    response = supabase.table("services").select("*").execute()
    return response.data


@app.get("/api/masters")
def get_masters():
    # Получаем всех мастеров
    response = supabase.table("masters").select("*").execute()
    return response.data


@app.get("/api/services/{category}")
def get_services_by_category(category: str):
    # Получаем услуги по категории (без учета регистра)
    response = supabase.table("services").select(
        "*").ilike("category", category).execute()

    # Если по какой-то причине ничего не нашлось, выведем это в консоль (чтобы понять причину)
    if not response.data:
        print(
            f"ВНИМАНИЕ: Для категории '{category}' ничего не найдено в Supabase!")

    return response.data
