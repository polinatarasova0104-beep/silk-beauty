const API_URL = 'http://127.0.0.1:8000';

async function loadMasters() {
    const container = document.getElementById('masters-list');

    try {
        const response = await fetch(`${API_URL}/api/masters`);
        const masters = await response.json();

        container.innerHTML = masters.map(m => `
            <div class="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div class="w-28 h-28 rounded-full bg-silk-light mx-auto mb-4 flex items-center justify-center text-4xl text-silk-pink">👩</div>
                <h3 class="font-playfair text-xl font-bold mb-2">${m.name}</h3>
                <div class="text-silk-gray text-sm mb-3">${m.specialization}</div>
                <div class="text-silk-gold text-lg mb-4">★ ${m.rating} (${m.reviews_count} отзывов)</div>
                <p class="text-silk-gray text-sm mb-5">Опыт: ${m.experience_years} лет</p>
                <a href="#" class="inline-block bg-silk-pink text-white px-4 py-2 rounded-lg font-semibold hover:bg-silk-dark-pink transition">Записаться</a>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<div class="text-center text-silk-gray py-10 col-span-4">Ошибка загрузки</div>';
    }
}

document.addEventListener('DOMContentLoaded', loadMasters);