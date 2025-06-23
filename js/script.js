document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle - ПЕРЕРАБОТАННАЯ ВЕРСИЯ
    const burgerButton = document.getElementById('burgerButton');
    const mainMenu = document.getElementById('mainMenu');
    const menuClose = document.querySelector('.menu-close');
    
    if (burgerButton && mainMenu) {
        burgerButton.addEventListener('click', () => {
            // Переключаем классы
            burgerButton.classList.toggle('active');
            mainMenu.classList.toggle('active');
            menuClose.style.display = 'block';
            
            // Блокируем скролл страницы при открытом меню
            document.body.style.overflow = mainMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu - ПЕРЕРАБОТАННАЯ ВЕРСИЯ
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            // Закрываем меню
            if (burgerButton) burgerButton.classList.remove('active');
            if (mainMenu) mainMenu.classList.remove('active');
            menuClose.style.display = 'none';
            
            // Восстанавливаем скролл страницы
            document.body.style.overflow = '';
        });
    }
    
    // Initialize slider only if elements exist
    const slider = document.querySelector('.slider-container');
const cards = document.querySelectorAll('.content-card');
const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');

if (slider && cards.length > 0 && prevButton && nextButton) {
    let currentSlide = 0;
    
    // Очищаем слайдер перед добавлением карточек
    slider.innerHTML = '';
    
    // Clone cards for slider and set proper width
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.style.minWidth = 'calc(100% - 20px)'; // Одна карточка с небольшими отступами
        clone.style.margin = '0 10px'; // Отступы между карточками
        slider.appendChild(clone);
    });
    
    // Получаем все карточки в слайдере
    const sliderCards = slider.querySelectorAll('.content-card');
    
    // Функция для перехода к конкретному слайду
    function goToSlide(index) {
        if (sliderCards.length === 0) return;
        
        // Корректируем индекс для циклической прокрутки
        if (index < 0) index = sliderCards.length - 1;
        if (index >= sliderCards.length) index = 0;
        
        currentSlide = index;
        
        // Рассчитываем позицию для прокрутки
        const cardWidth = sliderCards[0].offsetWidth + 20; // Ширина карточки + отступ
        const scrollPosition = index * cardWidth;
        
        // Прокручиваем к текущему слайду
        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    // Навигация по слайдеру
    prevButton.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
    
    nextButton.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
    
    // Touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        const threshold = 50;
        
        if (diff > threshold) {
            // Свайп влево - следующая карточка
            goToSlide(currentSlide + 1);
        } else if (diff < -threshold) {
            // Свайп вправо - предыдущая карточка
            goToSlide(currentSlide - 1);
        }
    }
    
    // Auto-center first slide on load
    setTimeout(() => {
        goToSlide(0);
    }, 100);
    
    // Обновляем позицию при изменении размера окна
    window.addEventListener('resize', () => {
        goToSlide(currentSlide);
    });
}
    
    // Popup functionality
    const infoButton = document.getElementById('infoButton');
    const popup = document.getElementById('popup');
    const popupClose = document.querySelector('.popup-close');
    
    if (infoButton && popup && popupClose) {
        infoButton.addEventListener('click', () => {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        function closePopup() {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        popupClose.addEventListener('click', closePopup);
        
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });
        
        // Close popup with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                closePopup();
            }
        });
    }
});