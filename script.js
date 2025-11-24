// Плавная прокрутка по якорным ссылкам
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрытие мобильного меню после клика (если открыто)
            if (document.querySelector('.nav').classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
});

// Модальное окно
const modal = document.getElementById('modal');
const bookBtn = document.getElementById('book-btn');
const modalClose = document.getElementById('modal-close');
const closeBtn = document.querySelector('.close');

// Открытие модального окна при клике на кнопку записи
bookBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Закрытие модального окна
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрытие модального окна при клике вне его области
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Валидация формы
const bookingForm = document.getElementById('booking-form');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Получение значений полей
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    
    // Валидация имени
    if (name.length < 2) {
        alert('Пожалуйста, введите корректное имя');
        return;
    }
    
    // Валидация телефона (простая проверка на минимальную длину)
    if (phone.length < 7) {
        alert('Пожалуйста, введите корректный номер телефона');
        return;
    }
    
    // Валидация выбора услуги
    if (!service) {
        alert('Пожалуйста, выберите услугу');
        return;
    }
    
    // Валидация даты
    if (!date) {
        alert('Пожалуйста, выберите дату');
        return;
    }
    
    // Проверка, что выбранная дата не в прошлом
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Пожалуйста, выберите дату в будущем');
        return;
    }
    
    // Если все проверки пройдены, показываем модальное окно
    modal.style.display = 'flex';
    
    // Очистка формы
    bookingForm.reset();
});

// Мобильное меню
const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav');

function toggleMobileMenu() {
    burgerMenu.classList.toggle('active');
    nav.classList.toggle('active');
    
    if (nav.classList.contains('active')) {
        nav.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        nav.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

burgerMenu.addEventListener('click', toggleMobileMenu);

// Закрытие мобильного меню при изменении размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.style.display = '';
        burgerMenu.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Анимация появления элементов при скролле
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .gallery-item, .about-content, .contacts-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Установка начальных стилей для анимации
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .gallery-item, .about-content, .contacts-content');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Первый запуск анимации
    setTimeout(animateOnScroll, 100);
});

// Запуск анимации при скролле
window.addEventListener('scroll', animateOnScroll);

// Установка минимальной даты для формы (сегодняшний день)
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
});
