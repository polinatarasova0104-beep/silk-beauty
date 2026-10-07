const API_URL = 'http://127.0.0.1:8000';

async function loadMasters() {
    const container = document.getElementById('masters-list');
    
    try {
        const response = await fetch(`${API_URL}/api/masters`);
        const masters = await response.json();
        
        container.innerHTML = masters.map(m => `
            <div class="master-card">
                <div class="master-photo">👩</div>
                <h3>${m.name}</h3>
                <div class="specialization">${m.specialization}</div>
                <div class="rating">★ ${m.rating} (${m.reviews_count} отзывов)</div>
                <p>Опыт: ${m.experience_years} лет</p>
                <br>
                <a href="#" class="btn-primary">Записаться</a>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<div class="loading">Ошибка загрузки</div>';
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', loadMasters);