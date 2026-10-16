# SEO-оптимизация проекта Silk Beauty

## Замер «до»

Lighthouse показал SEO = 89.
Проблема: отсутствует `<meta name="description">`.

![Замер до](before.png)

## Что сделано

### 1. Базовые метатеги

Добавлены на всех страницах:
- `<html lang="ru">`
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Уникальный `<title>` для каждой страницы
- Уникальный `<meta name="description">` для каждой страницы

### 2. Структура заголовков

Исправлено:
- `services.html`: `<h2>` → `<h1>` для «Наши услуги»
- `masters.html`: `<h2>` → `<h1>` для «Наши мастера»

На каждой странице один `<h1>`, остальные — `<h2>`, `<h3>` без пропусков.

### 3. robots.txt

Создан файл `frontend/robots.txt`:
- Закрыты: `/account/`, `/login/`, `/register/`, `/admin/`, `/api/`
- Указан Sitemap

### 4. sitemap.xml

Создан файл `frontend/sitemap.xml` с 3 публичными страницами:
- index.html
- services.html
- masters.html

### 5. X-Robots-Tag для API

В `backend/main.py` добавлен middleware:

```python
@app.middleware("http")
async def add_noindex_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Robots-Tag"] = "noindex, nofollow"
    return response