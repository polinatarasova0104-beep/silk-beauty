import sqlite3
import os

DB_FILE = 'silk_beauty.db'

# Удаляем старую базу, если есть
if os.path.exists(DB_FILE):
    os.remove(DB_FILE)

conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

# ============================================
# Создание таблиц
# ============================================
cursor.executescript("""
CREATE TABLE masters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    rating REAL DEFAULT 0.0,
    reviews_count INTEGER DEFAULT 0,
    experience_years INTEGER DEFAULT 0
);

CREATE TABLE services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    duration_minutes INTEGER NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    favorite_master_id INTEGER,
    favorite_design TEXT
);

CREATE TABLE master_services (
    master_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    PRIMARY KEY (master_id, service_id),
    FOREIGN KEY (master_id) REFERENCES masters(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

CREATE TABLE master_schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    master_id INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    FOREIGN KEY (master_id) REFERENCES masters(id)
);

CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    master_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    booking_date TEXT NOT NULL,
    booking_time TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (master_id) REFERENCES masters(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    master_id INTEGER NOT NULL,
    booking_id INTEGER,
    rating INTEGER NOT NULL,
    comment TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (master_id) REFERENCES masters(id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

CREATE TABLE notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    booking_id INTEGER,
    type TEXT NOT NULL,
    message TEXT,
    is_read INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
""")

# ============================================
# Мастера
# ============================================
cursor.executemany("INSERT INTO masters (name, specialization, rating, reviews_count, experience_years) VALUES (?, ?, ?, ?, ?)", [
    ('Anna Ivanova', 'Manicure, Pedicure', 4.9, 127, 6),
    ('Maria Petrova', 'Eyelash Extensions', 4.8, 94, 4),
    ('Ekaterina Sidorova', 'Brows', 5.0, 156, 8),
    ('Olga Kuznetsova', 'Hair Styling', 4.9, 112, 7),
])

# ============================================
# Услуги (30 штук)
# ============================================
cursor.executemany("INSERT INTO services (name, description, price, duration_minutes, category) VALUES (?, ?, ?, ?, ?)", [
    # Маникюр
    ('Classic Manicure', 'Hand nail care', 800.0, 60, 'manicure'),
    ('Hardware Manicure', 'Machine treatment with cutter', 1200.0, 90, 'manicure'),
    ('Manicure + Gel Polish', 'Gel polish coating', 1800.0, 120, 'manicure'),
    ('Nail Extensions', 'Gel nail extensions', 2500.0, 180, 'manicure'),
    ('Design (per nail)', 'Artistic nail design', 100.0, 10, 'manicure'),
    # Педикюр
    ('Classic Pedicure', 'Foot and nail care', 1200.0, 90, 'pedicure'),
    ('Hardware Pedicure', 'Machine treatment', 1800.0, 120, 'pedicure'),
    ('SPA Pedicure', 'Full foot care', 2500.0, 150, 'pedicure'),
    ('Pedicure + Gel Polish', 'Gel polish coating', 2300.0, 150, 'pedicure'),
    ('Foot Treatment', 'Callus and corn removal', 1500.0, 60, 'pedicure'),
    # Ресницы
    ('Eyelash Extensions 1D', 'Classic extensions', 2000.0, 120, 'lashes'),
    ('Eyelash Extensions 2D', 'Volume 2D', 2500.0, 150, 'lashes'),
    ('Eyelash Extensions 3D', 'Volume 3D', 3000.0, 180, 'lashes'),
    ('Hollywood Volume', 'Maximum density', 3500.0, 210, 'lashes'),
    ('Eyelash Correction', 'Extension refresh', 1500.0, 90, 'lashes'),
    ('Eyelash Removal', 'Extension removal', 500.0, 30, 'lashes'),
    ('Eyelash Lamination', 'Curl and nourishment', 1800.0, 90, 'lashes'),
    # Брови
    ('Eyebrow Correction', 'Shape design', 800.0, 45, 'brows'),
    ('Eyebrow Tinting', 'Dye or henna', 1000.0, 60, 'brows'),
    ('Eyebrow Lamination', 'Long-lasting styling', 1500.0, 60, 'brows'),
    # Волосы
    ('Women Haircut', 'Any complexity', 1500.0, 60, 'hair'),
    ('Men Haircut', 'Classic or clipper', 1000.0, 45, 'hair'),
    ('Kids Haircut', 'For children under 12', 800.0, 30, 'hair'),
    ('Hair Styling', 'Flat iron or curling', 1200.0, 60, 'hair'),
    ('Evening Styling', 'Curls, waves', 2000.0, 90, 'hair'),
    ('Wedding Hairstyle', 'With decor', 4000.0, 120, 'hair'),
    ('Hair Coloring', 'One color', 2500.0, 120, 'hair'),
    ('Balayage', 'Smooth transition', 5000.0, 240, 'hair'),
    ('Keratin Straightening', 'Smoothness and shine', 4000.0, 150, 'hair'),
    ('Hair Botox', 'Restoration', 3500.0, 120, 'hair'),
])

# ============================================
# Клиенты
# ============================================
cursor.executemany("INSERT INTO users (name, phone, email, password_hash, favorite_master_id, favorite_design) VALUES (?, ?, ?, ?, ?, ?)", [
    ('Polina Tarasova', '+79991234567', 'polina@mail.ru', 'hash1', 1, 'french'),
    ('Anna Smirnova', '+79992345678', 'anna@mail.ru', 'hash2', 2, 'classic'),
    ('Olga Kozlova', '+79993456789', 'olga@mail.ru', 'hash3', 3, 'rays'),
    ('Irina Morozova', '+79994567890', 'irina@mail.ru', 'hash4', 4, 'hollywood'),
    ('Svetlana Volkova', '+79995678901', 'svetlana@mail.ru', 'hash5', 1, 'gel polish'),
])

# ============================================
# Связь мастеров и услуг
# ============================================
cursor.executemany("INSERT INTO master_services (master_id, service_id) VALUES (?, ?)", [
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
    (2, 11), (2, 12), (2, 13), (2, 14), (2, 15), (2, 16), (2, 17),
    (3, 18), (3, 19), (3, 20),
    (4, 21), (4, 22), (4, 23), (4, 24), (4, 25), (4, 26), (4, 27), (4, 28), (4, 29), (4, 30),
])

# ============================================
# Расписание мастеров
# ============================================
cursor.executemany("INSERT INTO master_schedule (master_id, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?)", [
    (1, 1, '09:00', '21:00'), (1, 2, '09:00', '21:00'), (1, 3, '09:00', '21:00'),
    (1, 4, '09:00', '21:00'), (1, 5, '09:00', '21:00'), (1, 6, '10:00', '18:00'),
    (2, 1, '10:00', '20:00'), (2, 2, '10:00', '20:00'), (2, 3, '10:00', '20:00'),
    (2, 4, '10:00', '20:00'), (2, 5, '10:00', '20:00'), (2, 6, '10:00', '18:00'),
    (3, 1, '09:00', '18:00'), (3, 2, '09:00', '18:00'), (3, 3, '09:00', '18:00'),
    (3, 4, '09:00', '18:00'), (3, 5, '09:00', '18:00'),
    (4, 1, '11:00', '21:00'), (4, 2, '11:00', '21:00'), (4, 3, '11:00', '21:00'),
    (4, 4, '11:00', '21:00'), (4, 5, '11:00', '21:00'), (4, 6, '10:00', '18:00'), (4, 7, '10:00', '16:00'),
])

# ============================================
# Записи
# ============================================
cursor.executemany("INSERT INTO bookings (user_id, master_id, service_id, booking_date, booking_time, status) VALUES (?, ?, ?, ?, ?, ?)", [
    (1, 1, 3, '2026-06-15', '14:00', 'active'),
    (2, 2, 12, '2026-06-16', '11:00', 'active'),
    (3, 3, 18, '2026-06-17', '16:30', 'active'),
    (4, 4, 21, '2026-06-18', '12:00', 'active'),
    (5, 1, 1, '2026-06-19', '10:00', 'active'),
    (1, 1, 3, '2026-05-20', '14:00', 'completed'),
    (2, 2, 11, '2026-05-21', '11:00', 'completed'),
    (3, 3, 19, '2026-05-22', '16:30', 'completed'),
    (4, 4, 24, '2026-05-23', '12:00', 'completed'),
    (5, 1, 6, '2026-05-24', '10:00', 'cancelled'),
])

# ============================================
# Отзывы
# ============================================
cursor.executemany("INSERT INTO reviews (user_id, master_id, booking_id, rating, comment) VALUES (?, ?, ?, ?, ?)", [
    (1, 1, 6, 5, 'Great master! Everything neat and fast.'),
    (2, 2, 7, 5, 'Lashes are super! They last long.'),
    (3, 3, 8, 4, 'Good, but took a bit longer than expected.'),
    (4, 4, 9, 5, 'Olga is a magician!'),
    (5, 1, 10, 3, 'Cancelled last minute.'),
])

# ============================================
# Уведомления
# ============================================
cursor.executemany("INSERT INTO notifications (user_id, booking_id, type, message, is_read) VALUES (?, ?, ?, ?, ?)", [
    (1, 1, 'confirmation', 'Your booking is confirmed', 1),
    (2, 2, 'confirmation', 'Your booking is confirmed', 1),
    (3, 3, 'confirmation', 'Your booking is confirmed', 1),
    (4, 4, 'confirmation', 'Your booking is confirmed', 0),
    (5, 5, 'confirmation', 'Your booking is confirmed', 0),
    (1, 1, 'reminder', 'Reminder: tomorrow at 14:00', 0),
    (2, 2, 'reminder', 'Reminder: tomorrow at 11:00', 0),
    (5, 10, 'cancellation', 'Your booking has been cancelled', 1),
])

conn.commit()

# ============================================
# Проверка
# ============================================
cursor.execute("SELECT COUNT(*) FROM masters")
print(f" Мастеров: {cursor.fetchone()[0]}")

cursor.execute("SELECT COUNT(*) FROM services")
print(f"Услуг: {cursor.fetchone()[0]}")

cursor.execute("SELECT COUNT(*) FROM users")
print(f" Клиентов: {cursor.fetchone()[0]}")

cursor.execute("SELECT COUNT(*) FROM bookings")
print(f" Записей: {cursor.fetchone()[0]}")

cursor.execute("SELECT COUNT(*) FROM reviews")
print(f" Отзывов: {cursor.fetchone()[0]}")

cursor.execute("SELECT COUNT(*) FROM notifications")
print(f" Уведомлений: {cursor.fetchone()[0]}")

conn.close()
print("\n База SQLite создана: silk_beauty.db")