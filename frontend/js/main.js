const API_URL = 'http://127.0.0.1:8000';

async function loadServices() {
    const container = document.getElementById('services-list');
    
    try {
        const response = await fetch(`${API_URL}/api/services`);
        const services = await response.json();
        
        const preview = services.slice(0, 6);
        
        container.innerHTML = preview.map(s => `
            <div class="service-card">
                <div class="category">${s.category}</div>
                <h3>${s.name}</h3>
                <p class="description">${s.description || ''}</p>
                <div class="price">${s.price} ₽</div>
                <div class="duration">${s.duration_minutes} мин</div>
                <a href="#" class="btn-primary">Записаться</a>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<div class="loading">Не удалось загрузить услуги. Проверьте, что backend запущен.</div>';
        console.error('Ошибка:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadServices);