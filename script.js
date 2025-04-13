/**
 * ملف JavaScript الرئيسي لمزرعة السلطان
 * يحتوي على جميع الوظائف المطلوبة للموقع
 */

document.addEventListener('DOMContentLoaded', function() {
    // تفعيل القائمة المنزلقة للجوال
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navList.classList.toggle('active');
        });
    }

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (navList.classList.contains('active') && !e.target.closest('.main-nav')) {
            navList.classList.remove('active');
        }
    });

    // تحديد الصفحة الحالية وتفعيل الرابط المناسب
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // تنشيط العناصر عند التمرير (Scroll Animation)
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // تشغيل مرة أولية

    // زر العودة للأعلى
    const backToTopButton = document.createElement('div');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // تبديل أقسام نصائح التربية
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            tabBtns.forEach(b => b.classList.remove('active'));
            // إضافة النشاط للزر المحدد
            this.classList.add('active');
            
            // إخفاء جميع المحتويات
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // إظهار المحتوى المحدد
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // متتبع التمرير للتقدم في الصفحة
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollProgress + '%';
    });

    // رسالة ترحيبية
    setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.innerHTML = `
            <div class="welcome-content">
                <h3>مرحباً بك في مزرعة السلطان!</h3>
                <p>نحن هنا لرعاية كلبك بأفضل طريقة ممكنة</p>
                <button class="close-welcome">حسناً</button>
            </div>
        `;
        document.body.appendChild(welcomeMessage);
        
        document.querySelector('.close-welcome').addEventListener('click', function() {
            welcomeMessage.style.opacity = '0';
            setTimeout(() => {
                welcomeMessage.remove();
            }, 500);
        });
    }, 2000);

    // تأثيرات التحويم على البطاقات
    const cards = document.querySelectorAll('.info-card, .program-card, .feature-card, .tip-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });

    // فتح الخريطة في صفحة جديدة
    const mapButtons = document.querySelectorAll('.map-button, .open-map');
    mapButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank');
        });
    });
});

// دالة فتح الخريطة
function openMap() {
    window.open('https://maps.google.com/?q=30.185173,31.596825', '_blank');
}

// دالة إغلاق الخريطة
function closeMap() {
    document.getElementById('mapModal').classList.remove('active');
}

// دالة إرسال نموذج الاتصال (مثال)
function submitContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // هنا يمكنك إضافة كود الإرسال الفعلي
            alert('تم استلام رسالتك، سنتواصل معك قريباً!');
            form.reset();
        });
    }
}

// تهيئة جميع الوظائف عند تحميل الصفحة
window.onload = function() {
    submitContactForm();
};
