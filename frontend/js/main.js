const API_URL = '/api';

async function loadServices() {
    const container = document.getElementById('services-list');
    
    try {
        const response = await fetch(`${API_URL}/services`);
        const services = await response.json();
        
        const preview = services.slice(0, 6);
        
        container.innerHTML = preview.map(s => `
            <div class="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 shadow-xl border border-white hover:-translate-y-2 transition duration-300 flex flex-col justify-between">
                <div>
                    <div class="text-silk-pink text-xs uppercase tracking-wider font-bold mb-3">${s.category}</div>
                    <h3 class="font-playfair text-2xl font-bold mb-2">${s.name}</h3>
                    <p class="text-silk-gray text-sm mb-6">${s.description || ''}</p>
                    <div class="text-2xl font-bold text-silk-pink mb-2">${s.price} ₽</div>
                    <div class="text-silk-gray text-sm mb-8">${s.duration_minutes} мин</div>
                </div>
                <button onclick="openBooking()" class="w-full bg-silk-pink text-white py-3 rounded-xl font-bold hover:bg-silk-dark-pink transition shadow-lg shadow-silk-pink/30">Записаться</button>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<div class="text-center text-silk-gray py-10 col-span-3">Не удалось загрузить услуги. Проверьте, что backend запущен.</div>';
        console.error('Ошибка:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadServices);