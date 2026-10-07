import sqlite3

DB_FILE = 'silk_beauty.db'

def get_connection():
    """Создаёт подключение к SQLite"""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def test_connection():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM masters")
        count = cursor.fetchone()[0]
        conn.close()
        print(f"✅ Подключение к SQLite работает! Мастеров: {count}")
        return True
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        return False


if __name__ == "__main__":
    test_connection()