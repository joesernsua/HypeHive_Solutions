if (window.Swiper) {
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
}

const serviceValueToSlug = {
    'Social Media Management': 'social-media-management',
    'Content Creation': 'content-creation',
    'Branding & Design': 'branding-design',
    'Marketing Strategy': 'marketing-strategy'
};

const serviceSlugToValue = Object.fromEntries(
    Object.entries(serviceValueToSlug).map(([value, slug]) => [slug, value])
);

const pageParams = new URLSearchParams(window.location.search);
const legacyApplicationService = pageParams.get('service');

if (window.location.pathname.endsWith('/application.html') && legacyApplicationService) {
    const serviceSlug = serviceValueToSlug[legacyApplicationService] || legacyApplicationService;
    window.location.replace(`./service-details.html?service=${encodeURIComponent(serviceSlug)}`);
}

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

const serviceSelect = document.querySelector('#serviceSelect');
const serviceFormSection = document.querySelector('#service-form');
const customSelects = document.querySelectorAll('.custom-select');

const closeCustomSelects = (activeSelect = null) => {
    customSelects.forEach(select => {
        if (select !== activeSelect) {
            select.classList.remove('is-open');
            const trigger = select.querySelector('.custom-select-trigger');
            if (trigger) {
                trigger.setAttribute('aria-expanded', 'false');
            }
        }
    });
};

const setCustomSelectValue = (targetId, value) => {
    const input = document.querySelector(`#${targetId}`);
    const select = document.querySelector(`.custom-select[data-select-target="${targetId}"]`);

    if (!input || !select) {
        return;
    }

    input.value = value;

    const triggerText = select.querySelector('.custom-select-trigger span');
    const options = select.querySelectorAll('.custom-select-option');

    options.forEach(option => {
        const isSelected = option.getAttribute('data-value') === value;
        option.classList.toggle('is-selected', isSelected);
        option.setAttribute('aria-selected', String(isSelected));

        if (isSelected && triggerText) {
            triggerText.textContent = option.textContent;
        }
    });

    select.classList.remove('is-invalid', 'is-open');
    const error = select.parentElement.querySelector('.field-error');
    const trigger = select.querySelector('.custom-select-trigger');

    if (error) {
        error.hidden = true;
    }

    if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
    }
};

const resetCustomSelect = (targetId) => {
    const input = document.querySelector(`#${targetId}`);
    const select = document.querySelector(`.custom-select[data-select-target="${targetId}"]`);

    if (!input || !select) {
        return;
    }

    input.value = '';
    const triggerText = select.querySelector('.custom-select-trigger span');
    const defaultText = targetId === 'serviceSelect' ? 'Select a service' : 'Select a platform';

    if (triggerText) {
        triggerText.textContent = defaultText;
    }

    select.querySelectorAll('.custom-select-option').forEach(option => {
        option.classList.remove('is-selected');
        option.setAttribute('aria-selected', 'false');
    });
};

customSelects.forEach(select => {
    const trigger = select.querySelector('.custom-select-trigger');
    const options = select.querySelectorAll('.custom-select-option');
    const targetId = select.getAttribute('data-select-target');

    if (trigger) {
        trigger.addEventListener('click', () => {
            const willOpen = !select.classList.contains('is-open');
            closeCustomSelects(select);
            select.classList.toggle('is-open', willOpen);
            trigger.setAttribute('aria-expanded', String(willOpen));
        });
    }

    options.forEach(option => {
        option.addEventListener('click', () => {
            setCustomSelectValue(targetId, option.getAttribute('data-value'));
        });
    });
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.custom-select')) {
        closeCustomSelects();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCustomSelects();
    }
});

document.querySelectorAll('.service-apply').forEach(button => {
    button.addEventListener('click', () => {
        const selectedService = button.getAttribute('data-service');

        setCustomSelectValue('serviceSelect', selectedService);

        if (serviceFormSection) {
            const offset = 88;
            const targetPosition = serviceFormSection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const selectedServiceFromDetails = pageParams.get('service');
if (selectedServiceFromDetails) {
    setCustomSelectValue('serviceSelect', serviceSlugToValue[selectedServiceFromDetails] || selectedServiceFromDetails);

    if (serviceFormSection && window.location.hash === '#service-form') {
        setTimeout(() => {
            const offset = 88;
            const targetPosition = serviceFormSection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 80);
    }
}

const applicationForm = document.querySelector('#serviceApplicationForm');
const formSuccess = document.querySelector('#formSuccess');

if (applicationForm && formSuccess) {
    const requiredFields = applicationForm.querySelectorAll('input[required], textarea[required]');

    const setFieldError = (field, isInvalid) => {
        const group = field.closest('.field-group');
        const error = group ? group.querySelector('.field-error') : null;

        if (group) {
            group.classList.toggle('is-invalid', isInvalid);
        }

        if (error) {
            error.hidden = !isInvalid;
        }
    };

    const validateRequiredFields = () => {
        let firstInvalidField = null;

        requiredFields.forEach(field => {
            const isEmpty = !field.value.trim();
            const isInvalidEmail = field.type === 'email' && field.value.trim() && !field.validity.valid;
            const isInvalid = isEmpty || isInvalidEmail;

            setFieldError(field, isInvalid);

            if (isInvalid && !firstInvalidField) {
                firstInvalidField = field;
            }
        });

        return firstInvalidField;
    };

    requiredFields.forEach(field => {
        field.addEventListener('input', () => {
            if (field.value.trim()) {
                setFieldError(field, field.type === 'email' && !field.validity.valid);
            }
        });
    });

    applicationForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const firstInvalidField = validateRequiredFields();
        const requiredSelects = ['serviceSelect', 'platformSelect'];
        const firstInvalidSelect = requiredSelects.find(targetId => {
            const input = document.querySelector(`#${targetId}`);
            const select = document.querySelector(`.custom-select[data-select-target="${targetId}"]`);
            const error = select ? select.parentElement.querySelector('.field-error') : null;
            const isInvalid = !input || !input.value;

            if (select) {
                select.classList.toggle('is-invalid', isInvalid);
            }

            if (error) {
                error.hidden = !isInvalid;
            }

            return isInvalid;
        });

        if (firstInvalidField || firstInvalidSelect) {
            if (firstInvalidField) {
                firstInvalidField.focus();
                return;
            }

            const trigger = document.querySelector(`.custom-select[data-select-target="${firstInvalidSelect}"] .custom-select-trigger`);
            if (trigger) {
                trigger.focus();
            }
            return;
        }

        const customerEmail = applicationForm.querySelector('#customerEmail');
        const replyToInput = applicationForm.querySelector('input[name="_replyto"]');
        const nextInput = applicationForm.querySelector('input[name="_next"]');
        const submitButton = applicationForm.querySelector('.form-submit');

        if (replyToInput && customerEmail) {
            replyToInput.value = customerEmail.value;
        }

        if (nextInput) {
            nextInput.value = `${window.location.origin}${window.location.pathname}?sent=true#service-form`;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        applicationForm.submit();
    });
}

if (new URLSearchParams(window.location.search).get('sent') === 'true' && formSuccess) {
    formSuccess.textContent = 'Thank you! Your service application has been sent. Please check your email for confirmation.';
    formSuccess.hidden = false;
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

const feedbackGrid = document.querySelector('.feedback-grid');
if (feedbackGrid && !feedbackGrid.dataset.marqueeReady) {
    const reviewCards = Array.from(feedbackGrid.children);

    reviewCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        feedbackGrid.appendChild(clone);
    });

    feedbackGrid.dataset.marqueeReady = 'true';
}

const globalAnimatedElements = document.querySelectorAll([
    '.hype-hero .hero-content',
    '.hero-main-image',
    '.audience-chips span',
    '.section-heading',
    '.info-panel',
    '.brand-showcase',
    '.brand-logo-panel',
    '.brand-details',
    '.color-chip',
    '.shadow-2',
    '.service-modern-card',
    '.service-image-slot',
    '.service-form-card',
    '.field-group',
    '.strategy-subheading',
    '.goal-card',
    '.team-heading',
    '.team-card',
    '.feedback-heading',
    '.feedback-card',
    '.campaign-card',
    '.campaign-section .section-heading',
    '.swiper-slide > .w-full',
    '.social-link',
    '.cta-copy',
    '.contact-panel'
].join(','));

globalAnimatedElements.forEach((element, index) => {
    element.classList.add('reveal');

    if (element.matches('.hero-main-image, .brand-details, .feedback-heading, .contact-panel')) {
        element.classList.add('reveal-right');
    } else if (element.matches('.brand-logo-panel, .hype-hero .hero-content, .section-heading')) {
        element.classList.add('reveal-left');
    } else if (element.matches('.service-modern-card, .team-card, .campaign-card, .feedback-card, .goal-card, .color-chip, .field-group, .audience-chips span')) {
        element.classList.add('reveal-scale');
    }

    element.style.setProperty('--delay', `${Math.min((index % 6) * 70, 350)}ms`);
});

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: '0px 0px -70px 0px'
    });

    globalAnimatedElements.forEach(element => revealObserver.observe(element));
} else {
    globalAnimatedElements.forEach(element => element.classList.add('is-visible'));
}
