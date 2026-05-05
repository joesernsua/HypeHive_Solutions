new Swiper('.swiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: {                       
        delay: 3000,  
    },
    pagination: {                      
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-btn-next',
        prevEl: '.swiper-btn-prev',
    },
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        const offset = 88;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
});
});

document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
        const text = button.getAttribute('data-copy');
        const originalText = button.textContent;

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }

            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 1200);
        } catch (error) {
            button.textContent = 'Copy failed';
            setTimeout(() => {
                button.textContent = originalText;
            }, 1200);
        }
    });
});
