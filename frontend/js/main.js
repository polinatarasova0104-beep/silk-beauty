const API_URL = 'http://127.0.0.1:8000';

async function loadServices() {
    const container = document.getElementById('services-list');

    try {
        const response = await fetch(`${API_URL}/api/services`);
        const services = await response.json();

        const preview = services.slice(0, 6);

        container.innerHTML = preview.map(s => `
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:-translate-y-1 transition">
                <div class="text-silk-pink text-xs uppercase tracking-wider mb-2">${s.category}</div>
                <h3 class="font-playfair text-xl font-bold mb-3">${s.name}</h3>
                <p class="text-silk-gray text-sm mb-4">${s.description || ''}</p>
                <div class="text-xl font-bold text-silk-pink mb-2">${s.price} ₽</div>
                <div class="text-silk-gray text-sm mb-5">${s.duration_minutes} мин</div>
                <a href="#" class="inline-block bg-silk-pink text-white px-4 py-2 rounded-lg font-semibold hover:bg-silk-dark-pink transition">Записаться</a>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<div class="text-center text-silk-gray py-10 col-span-3">Не удалось загрузить услуги. Проверьте, что backend запущен.</div>';
        console.error('Ошибка:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadServices);