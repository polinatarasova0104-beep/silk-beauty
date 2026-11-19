function createBookingModal() {
    if (document.getElementById('booking-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'booking-modal';
    modal.className = 'fixed inset-0 bg-silk-dark/60 z-[100] hidden items-center justify-center backdrop-blur-sm px-4 transition-opacity duration-300';
    
    modal.innerHTML = `
        <div class="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl relative">
            <button onclick="closeBooking()" class="absolute top-5 right-6 text-silk-gray hover:text-silk-pink text-3xl leading-none transition">&times;</button>
            
            <div class="text-center mb-6">
                <h2 class="font-playfair text-3xl font-bold text-silk-dark mb-2">Запись в Silk Beauty</h2>
                <p class="text-silk-gray text-sm">Оставьте заявку, и мы свяжемся с вами</p>
            </div>
            
            <form id="booking-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-silk-dark mb-1">Ваше имя</label>
                    <input type="text" id="book-name" required class="w-full px-4 py-2 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-silk-pink bg-gray-50 transition" placeholder="Анна">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-silk-dark mb-1">Телефон</label>
                    <input type="tel" id="book-phone" required class="w-full px-4 py-2 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-silk-pink bg-gray-50 transition" placeholder="+7 (999) 000-00-00">
                </div>
                
                <!-- ВЫБОР ДАТЫ И ВРЕМЕНИ -->
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-sm font-semibold text-silk-dark mb-1">Дата</label>
                        <input type="date" id="book-date" required class="w-full px-4 py-2 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-silk-pink bg-gray-50 transition">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-silk-dark mb-1">Время</label>
                        <input type="time" id="book-time" required class="w-full px-4 py-2 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-silk-pink bg-gray-50 transition">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-silk-dark mb-1">Услуга</label>
                    <select id="book-service" class="w-full px-4 py-2 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-silk-pink bg-gray-50 transition">
                        <!-- Сюда будут подставляться названия с сайта -->
                    </select>
                </div>

                <!-- КОММЕНТАРИЙ -->
                <div>
                    <label class="block text-sm font-semibold text-silk-dark mb-1">Комментарий (по желанию)</label>
                    <textarea id="book-comment" rows="2" class="w-full px-4 py-2 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-silk-pink bg-gray-50 transition" placeholder="Например: хочу французский маникюр"></textarea>
                </div>

                <button type="submit" class="w-full bg-silk-pink text-white py-3 rounded-xl font-bold text-lg hover:bg-silk-dark-pink transition shadow-lg shadow-silk-pink/30 mt-2">Записаться</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('booking-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = e.target.querySelector('button[type="submit"]');
        btn.textContent = 'Отправка...';
        btn.disabled = true;

        const name = document.getElementById('book-name').value;
        const phone = document.getElementById('book-phone').value;
        const service = document.getElementById('book-service').value;
        const date = document.getElementById('book-date').value;
        const time = document.getElementById('book-time').value;
        const comment = document.getElementById('book-comment').value;

        const SUPABASE_URL = "https://toedeeggcbgdyvtfpntq.supabase.co";
        const SUPABASE_KEY = "sb_publishable_UTAh07w33ICbgMDLI2lV9Q_bFRAERc3";
        const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        try {
            const { data: { user } } = await supabaseClient.auth.getUser();
            
            const { error } = await supabaseClient.from('bookings').insert({
                client_name: name,
                phone: phone,
                service_name: service,
                user_email: user ? user.email : null, 
                booking_date: date,
                booking_time: time,
                comment: comment,
                status: 'active'
            });

            if (error) throw error;

            alert('Спасибо! Ваша заявка принята.');
            closeBooking();
            
            if (window.location.pathname.includes('account.html') || window.location.pathname.includes('category.html')) {
                window.location.reload();
            }

        } catch (error) {
            alert('Ошибка при записи: ' + error.message);
        } finally {
            btn.textContent = 'Записаться';
            btn.disabled = false;
        }
    });
}

function openBooking(serviceName = null) {
    createBookingModal();
    const modal = document.getElementById('booking-modal');
    const select = document.getElementById('book-service');
    
    select.innerHTML = '';
    
    if (serviceName) {
        const option = document.createElement('option');
        option.value = serviceName;
        option.textContent = serviceName;
        select.appendChild(option);
    } else {
        select.innerHTML = `
            <option value="Маникюр">Маникюр</option>
            <option value="Педикюр">Педикюр</option>
            <option value="Наращивание ресниц">Наращивание ресниц</option>
            <option value="Коррекция бровей">Коррекция бровей</option>
            <option value="Укладка волос">Укладка волос</option>
        `;
    }

    // Ставим сегодняшнюю дату по умолчанию
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('book-date').value = today;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeBooking() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}