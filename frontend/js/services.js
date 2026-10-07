const API_URL = 'http://127.0.0.1:8000';
let allServices = [];

async function loadServices() {
    const container = document.getElementById('services-list');
    
    try {
        const response = await fetch(`${API_URL}/api/services`);
        allServices = await response.json();
        renderServices(allServices);
    } catch (error) {
        container.innerHTML = '<div class="loading">Ошибка загрузки. Проверьте backend.</div>';
        console.error(error);
    }
}

function renderServices(services) {
    const container = document.getElementById('services-list');
    
    if (services.length === 0) {
        container.innerHTML = '<div class="loading">Ничего не найдено</div>';
        return;
    }
    
    container.innerHTML = services.map(s => `
        <div class="service-card">
            <div class="category">${s.category}</div>
            <h3>${s.name}</h3>
            <p class="description">${s.description || ''}</p>
            <div class="price">${s.price} ₽</div>
            <div class="duration">${s.duration_minutes} мин</div>
            <a href="#" class="btn-primary">Записаться</a>
        </div>
    `).join('');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        if (category === 'all') {
            renderServices(allServices);
        } else {
            renderServices(allServices.filter(s => s.category === category));
        }
    });
});

document.addEventListener('DOMContentLoaded', loadServices);