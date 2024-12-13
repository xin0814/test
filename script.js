document.addEventListener('DOMContentLoaded', function() {
    // 漢堡選單控制
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // 輪播圖控制
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    // 創建導航點
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dots.appendChild(dot);
    });

    // 更新輪播圖
    function updateSlider() {
        slides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots.children[currentSlide].classList.add('active');
    }

    // 切換到指定幻燈片
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    // 下一張幻燈片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    // 上一張幻燈片
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // 添加按鈕事件監聽
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // 自動播放，每3秒切換一次
    setInterval(nextSlide, 3000);

    // 暗黑模式切換
    const themeToggle = document.getElementById('theme-toggle');
    
    // 檢查本地存儲中的主題設置
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    // 切換主題
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    const images = document.querySelectorAll('.slide img');

    // 處理圖片載入
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    // 添加滑動手勢支持
    let touchStartX = 0;
    let touchEndX = 0;

    const slider = document.querySelector('.slider-container');

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // 添加鍵盤控制
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // 添加滑鼠滾輪控制
    slider.addEventListener('wheel', e => {
        e.preventDefault();
        if (e.deltaY > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }, { passive: false });

    // 暫停和恢復自動播放
    let slideInterval = setInterval(nextSlide, 3000);

    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 3000);
    });

    // 滾動顯示動畫
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('visible');
            }
        });
    }

    // 添加滾動監聽
    window.addEventListener('scroll', handleScrollAnimation);

    // 頁面加載時也檢查一次
    handleScrollAnimation();

    // 平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 滑鼠移動視差效果
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.service-card');
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;

            const angleX = (mouseY - cardY) / 30;
            const angleY = (mouseX - cardX) / -30;

            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
    });

    // 添加載入動畫
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
}); 