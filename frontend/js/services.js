const API_URL = 'http://127.0.0.1:8000';
let allServices = [];

async function loadServices() {
    const container = document.getElementById('services-list');
    try {
        const response = await fetch(`${API_URL}/api/services`);
        allServices = await response.json();
        renderServices(allServices);
    } catch (error) {
        container.innerHTML = '<div class="text-center text-silk-gray py-10 col-span-3">Ошибка загрузки</div>';
    }
}

function renderServices(services) {
    const container = document.getElementById('services-list');

    if (services.length === 0) {
        container.innerHTML = '<div class="text-center text-silk-gray py-10 col-span-3">Ничего не найдено</div>';
        return;
    }

    container.innerHTML = services.map(s => `
        <div class="bg-white rounded-2xl p-8 shadow-lg hover:-translate-y-1 transition">
            <div class="text-silk-pink text-xs uppercase tracking-wider mb-2">${s.category}</div>
            <h3 class="font-playfair text-xl font-bold mb-3">${s.name}</h3>
            <p class="text-silk-gray text-sm mb-4">${s.description || ''}</p>
            <div class="text-xl font-bold text-silk-pink mb-2">${s.price} ₽</div>
            <div class="text-silk-gray text-sm mb-5">${s.duration_minutes} мин</div>
            <a href="#" class="inline-block bg-silk-pink text-white px-4 py-2 rounded-lg font-semibold hover:bg-silk-dark-pink transition">Записаться</a>
        </div>
    `).join('');
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active', 'bg-silk-pink', 'text-white');
        });
        btn.classList.add('active', 'bg-silk-pink', 'text-white');

        const category = btn.dataset.category;
        if (category === 'all') {
            renderServices(allServices);
        } else {
            renderServices(allServices.filter(s => s.category === category));
        }
    });
});

document.addEventListener('DOMContentLoaded', loadServices);