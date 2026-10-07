from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_connection

app = FastAPI(
    title="Silk Beauty API",
    description="API для салона красоты Silk Beauty",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Silk Beauty API работает!",
        "docs": "/docs",
        "endpoints": ["/api/services", "/api/masters", "/api/bookings"]
    }


@app.get("/api/services")
def get_services():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, description, price, duration_minutes, category FROM services ORDER BY category, name")
    rows = cursor.fetchall()
    conn.close()
    
    return [
        {
            "id": r["id"],
            "name": r["name"],
            "description": r["description"],
            "price": r["price"],
            "duration_minutes": r["duration_minutes"],
            "category": r["category"],
        }
        for r in rows
    ]


@app.get("/api/services/{category}")
def get_services_by_category(category: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, description, price, duration_minutes, category FROM services WHERE category = ? ORDER BY name", (category,))
    rows = cursor.fetchall()
    conn.close()
    
    return [
        {
            "id": r["id"],
            "name": r["name"],
            "description": r["description"],
            "price": r["price"],
            "duration_minutes": r["duration_minutes"],
            "category": r["category"],
        }
        for r in rows
    ]


@app.get("/api/masters")
def get_masters():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, specialization, rating, reviews_count, experience_years FROM masters ORDER BY rating DESC")
    rows = cursor.fetchall()
    conn.close()
    
    return [
        {
            "id": r["id"],
            "name": r["name"],
            "specialization": r["specialization"],
            "rating": r["rating"],
            "reviews_count": r["reviews_count"],
            "experience_years": r["experience_years"],
        }
        for r in rows
    ]


@app.get("/api/masters/{master_id}")
def get_master(master_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, name, specialization, rating, reviews_count, experience_years FROM masters WHERE id = ?", (master_id,))
    row = cursor.fetchone()
    
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Мастер не найден")
    
    master = {
        "id": row["id"],
        "name": row["name"],
        "specialization": row["specialization"],
        "rating": row["rating"],
        "reviews_count": row["reviews_count"],
        "experience_years": row["experience_years"],
        "services": []
    }
    
    cursor.execute("""
        SELECT s.id, s.name, s.price, s.duration_minutes
        FROM services s
        JOIN master_services ms ON s.id = ms.service_id
        WHERE ms.master_id = ?
    """, (master_id,))
    
    for s in cursor.fetchall():
        master["services"].append({
            "id": s["id"],
            "name": s["name"],
            "price": s["price"],
            "duration_minutes": s["duration_minutes"],
        })
    
    conn.close()
    return master


@app.get("/api/bookings")
def get_bookings():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT 
            b.id,
            u.name AS client_name,
            m.name AS master_name,
            s.name AS service_name,
            b.booking_date,
            b.booking_time,
            b.status
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN masters m ON b.master_id = m.id
        JOIN services s ON b.service_id = s.id
        ORDER BY b.booking_date DESC
    """)
    rows = cursor.fetchall()
    conn.close()
    
    return [
        {
            "id": r["id"],
            "client_name": r["client_name"],
            "master_name": r["master_name"],
            "service_name": r["service_name"],
            "booking_date": r["booking_date"],
            "booking_time": r["booking_time"],
            "status": r["status"],
        }
        for r in rows
    ]