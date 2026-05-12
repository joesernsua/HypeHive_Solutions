(function () {
    const serviceSlugToValue = {
        'social-media-management': 'Social Media Management',
        'content-creation': 'Content Creation',
        'branding-design': 'Branding & Design',
        'marketing-strategy': 'Marketing Strategy'
    };

    const formSection = document.querySelector('#service-form');
    const form = document.querySelector('#serviceApplicationForm');
    const formSuccess = document.querySelector('#formSuccess');
    const customSelects = document.querySelectorAll('.custom-select');

    if (!form) {
        return;
    }

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

        if (!input || !select || !value) {
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

    document.addEventListener('click', event => {
        if (!event.target.closest('.custom-select')) {
            closeCustomSelects();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeCustomSelects();
        }
    });

    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    const selectedService = window.HypeHiveCurrentServiceValue || serviceSlugToValue[serviceParam] || serviceParam;

    setCustomSelectValue('serviceSelect', selectedService);

    if (formSection && window.location.hash === '#service-form') {
        setTimeout(() => {
            const offset = 88;
            const targetPosition = formSection.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 80);
    }

    const requiredFields = form.querySelectorAll('input[required], textarea[required]');

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

    form.addEventListener('submit', event => {
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

        const customerEmail = form.querySelector('#customerEmail');
        const replyToInput = form.querySelector('input[name="_replyto"]');
        const nextInput = form.querySelector('input[name="_next"]');
        const submitButton = form.querySelector('.form-submit');

        if (replyToInput && customerEmail) {
            replyToInput.value = customerEmail.value;
        }

        if (nextInput) {
            const nextParams = new URLSearchParams();
            if (serviceParam) {
                nextParams.set('service', serviceParam);
            }
            nextParams.set('sent', 'true');
            nextInput.value = `${window.location.origin}${window.location.pathname}?${nextParams.toString()}#service-form`;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        form.submit();
    });

    if (params.get('sent') === 'true' && formSuccess) {
        formSuccess.textContent = 'Thank you! Your service application has been sent. Please check your email for confirmation.';
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
})();
