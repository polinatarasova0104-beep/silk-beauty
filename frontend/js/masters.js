const API_URL = '/api';

const reviewsData = {
    "Ekaterina Sidorova": [
        { name: "Анна", date: "12 октября", text: "Отличный мастер! Брови идеальные, форма супер.", stars: 5 },
        { name: "Елена", date: "5 октября", text: "Очень аккуратно, но пришлось немного подождать.", stars: 4 },
        { name: "Мария", date: "28 сентября", text: "Профессионал! Все объяснила, подобрала форму.", stars: 5 },
        { name: "Ольга", date: "15 сентября", text: "Лучший мастер по бровям в городе!", stars: 5 },
        { name: "Дарья", date: "2 сентября", text: "Хорошо, но цвет немного темнее, чем хотелось.", stars: 4 }
    ],
    "Anna Ivanova": [
        { name: "Виктория", date: "10 октября", text: "Маникюр держится уже 3 недели, ни одного скола!", stars: 5 },
        { name: "Светлана", date: "1 октября", text: "Очень чисто, аккуратно. Дизайн супер!", stars: 5 },
        { name: "Алина", date: "20 сентября", text: "Немного опоздала, но мастер вошла в положение.", stars: 4 }
    ],
    "Olga Kuznetsova": [
        { name: "Кристина", date: "14 октября", text: "Укладка продержалась весь вечер и даже на утро!", stars: 5 },
        { name: "Ирина", date: "8 октября", text: "Сделала свадебную прическу — все гости в восторге.", stars: 5 },
        { name: "Наталья", date: "25 сентября", text: "Красиво, но хотелось быстрее.", stars: 4 },
        { name: "Юлия", date: "18 сентября", text: "Локоны шикарные, спасибо большое!", stars: 5 }
    ],
    "Maria Petrova": [
        { name: "Анастасия", date: "11 октября", text: "Ресницы 2D — просто мечта! Смотрятся естественно.", stars: 5 },
        { name: "Полина", date: "2 октября", text: "Чуть-чуть пощипало во время процедуры, но результат отличный.", stars: 4 }
    ],
    "Irina Smirnova": [
        { name: "Ольга", date: "15 октября", text: "Невероятный дизайн ногтей, все знакомые в восторге!", stars: 5 },
        { name: "Татьяна", date: "9 октября", text: "Очень быстро и качественно.", stars: 5 },
        { name: "Юлия", date: "1 октября", text: "Красиво, но хотелось бы подешевле.", stars: 4 }
    ],
    "Svetlana Volkova": [
        { name: "Наталья", date: "16 октября", text: "Лучший SPA-педикюр в моей жизни, ножки как новые!", stars: 5 },
        { name: "Екатерина", date: "12 октября", text: "Очень расслабляющая атмосфера.", stars: 5 }
    ],
    "Alina Morozova": [
        { name: "Дарья", date: "14 октября", text: "Сделала ламинирование ресниц и бровей, выглядит потрясающе.", stars: 5 },
        { name: "Алина", date: "5 октября", text: "Хороший мастер, все понравилось.", stars: 4 }
    ],
    "Daria Sokolova": [
        { name: "Марина", date: "13 октября", text: "Сложное окрашивание прошло идеально, цвет точно как на фото!", stars: 5 },
        { name: "Светлана", date: "7 октября", text: "Профессионал, знает свое дело.", stars: 5 },
        { name: "Оксана", date: "3 октября", text: "Немного не то, что просила, но все равно красиво.", stars: 4 }
    ]
};

function openReviews(masterName) {
    const oldModal = document.getElementById('reviews-modal');
    if (oldModal) oldModal.remove();

    const masterReviews = reviewsData[masterName] || [];
    const totalReviews = masterReviews.length;
    const avgRating = totalReviews > 0 
        ? (masterReviews.reduce((sum, r) => sum + r.stars, 0) / totalReviews).toFixed(1) 
        : "0.0";

    const reviewsHtml = masterReviews.map(r => `
        <div class="border-b border-gray-100 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-silk-light flex items-center justify-center text-silk-pink font-bold">${r.name[0]}</div>
                    <div>
                        <div class="font-bold text-sm text-silk-dark">${r.name}</div>
                        <div class="text-xs text-silk-gray">${r.date}</div>
                    </div>
                </div>
                <div class="text-silk-gold text-sm">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
            </div>
            <p class="text-sm text-silk-gray/90 leading-relaxed">${r.text}</p>
        </div>
    `).join('');

    const modal = document.createElement('div');
    modal.id = 'reviews-modal';
    modal.className = 'fixed inset-0 bg-silk-dark/60 z-[100] flex items-center justify-center backdrop-blur-sm px-4 transition-opacity';
    
    modal.innerHTML = `
        <div class="bg-white rounded-[32px] p-8 max-w-lg w-full shadow-2xl relative flex flex-col max-h-[80vh]">
            <button onclick="document.getElementById('reviews-modal').remove()" class="absolute top-5 right-6 text-silk-gray hover:text-silk-pink text-3xl leading-none transition">&times;</button>
            <div class="mb-6 border-b border-gray-100 pb-4">
                <h2 class="font-playfair text-2xl font-bold text-silk-dark">Отзывы о мастере</h2>
                <p class="text-silk-pink font-semibold text-lg">${masterName}</p>
                <div class="flex items-center gap-2 mt-2">
                    <span class="text-silk-gold text-lg">★ ${avgRating}</span>
                    <span class="text-silk-gray text-sm">(${totalReviews} отзывов)</span>
                </div>
            </div>
            <div class="overflow-y-auto pr-2">
                ${reviewsHtml.length > 0 ? reviewsHtml : '<p class="text-center text-gray-400 py-4">Пока нет отзывов</p>'}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

async function loadMasters() {
    const container = document.getElementById('masters-list');
    
    try {
        const response = await fetch(`${API_URL}/masters`);
        const masters = await response.json();
        
        const photos = [
            "images/masters/master1.jpg", "images/masters/master2.jpg",
            "images/masters/master3.jpg", "images/masters/master4.jpg",
            "images/masters/master5.jpg", "images/masters/master6.jpg",
            "images/masters/master7.jpg", "images/masters/master8.jpg"
        ];

        container.innerHTML = masters.map((m, index) => {
            const masterReviews = reviewsData[m.name] || [];
            const count = masterReviews.length;
            const rating = count > 0 ? (masterReviews.reduce((sum, r) => sum + r.stars, 0) / count).toFixed(1) : "0.0";
            const photoSrc = photos[index] || "https://via.placeholder.com/150";

            return `
            <div class="bg-white/80 backdrop-blur-sm rounded-[32px] p-6 shadow-xl text-center border border-white hover:-translate-y-2 transition duration-300 flex flex-col justify-between">
                <div>
                    <div class="relative inline-block mb-4">
                        <img src="${photoSrc}" alt="${m.name}" class="w-28 h-28 rounded-full object-cover border-4 border-silk-light shadow-md mx-auto">
                        <div class="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                            <span class="text-silk-gold text-sm">★</span>
                        </div>
                    </div>
                    <h3 class="font-playfair text-xl font-bold mb-1">${m.name}</h3>
                    <div class="text-silk-pink text-xs font-semibold mb-3 h-8 overflow-hidden">${m.specialization}</div>
                    <div class="bg-silk-light inline-block px-3 py-1 rounded-full text-xs mb-4">
                        <span class="text-silk-gold">★ ${rating}</span> <span class="text-silk-gray">(${count} отзывов)</span>
                    </div>
                    <p class="text-silk-gray text-sm mb-6">Опыт: <span class="font-semibold text-silk-dark">${m.experience_years} лет</span></p>
                </div>
                <div class="flex flex-col gap-2">
                    <button onclick="openBooking()" class="w-full bg-silk-pink text-white py-2.5 rounded-xl font-bold hover:bg-silk-dark-pink transition shadow-lg text-sm">Записаться</button>
                    <button onclick="openReviews('${m.name}')" class="w-full bg-transparent border-2 border-silk-pink text-silk-pink py-2.5 rounded-xl font-bold hover:bg-silk-pink hover:text-white transition text-sm">Отзывы</button>
                </div>
            </div>
            `;
        }).join('');
    } catch (error) {
        container.innerHTML = '<div class="text-center text-silk-gray py-10 col-span-full">Ошибка загрузки. Проверьте backend.</div>';
    }
}

document.addEventListener('DOMContentLoaded', loadMasters);