import { getTranslation } from './i18n.js';

export function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        setupWaitlistForm();
        return;
    }

    // Auto-select game from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const gameParam = urlParams.get('game');
    if (gameParam) {
        const gameSelect = document.getElementById('game');
        if (gameSelect) {
            gameSelect.value = gameParam;
        }
    }

    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const btn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const btnSpinner = document.getElementById('btn-spinner');
        const statusDiv = document.getElementById('form-status');
        const lang = localStorage.getItem('lang') || 'en';

        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            alert(await getTranslation(lang, 'captcha_error') || 'Please complete the reCAPTCHA verification.');
            return;
        }

        btn.disabled = true;
        btnText.style.opacity = '0';
        btnSpinner.style.display = 'block';
        statusDiv.style.display = 'none';
        
        try {
            const serviceID = 'service_4q2a8zg';
            const templateID = 'template_contactus';

            await emailjs.sendForm(serviceID, templateID, this);

            statusDiv.textContent = await getTranslation(lang, 'form_success') || 'Message sent successfully!';
            statusDiv.className = 'success';
            statusDiv.style.display = 'block';

            // Scroll to the success message so the user sees it
            statusDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

            contactForm.reset();
            grecaptcha.reset();

        } catch (error) {
            console.error('FAILED...', error);
            statusDiv.textContent = await getTranslation(lang, 'form_send_error') || 'Failed to send message.';
            statusDiv.className = 'error';
            statusDiv.style.display = 'block';
        } finally {
            btn.disabled = false;
            btnText.style.opacity = '1';
            btnSpinner.style.display = 'none';
        }
    });

    setupWaitlistForm();
}

export function setupWaitlistForm() {
    const waitlistForm = document.getElementById('waitlist-form');
    if (!waitlistForm) return;

    // Suppression d'éventuels anciens messages
    const existingMsg = document.getElementById('waitlist-status');
    if (existingMsg) existingMsg.remove();

    const statusMsg = document.createElement('div');
    statusMsg.id = 'waitlist-status';
    statusMsg.style.fontSize = '14px';
    statusMsg.style.marginTop = '12px';
    statusMsg.style.display = 'none';
    waitlistForm.parentNode.appendChild(statusMsg);

    waitlistForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('notify-email');
        const btn = document.getElementById('notify-btn');
        const lang = localStorage.getItem('lang') || 'en';

        btn.disabled = true;
        btn.style.opacity = '0.7';
        statusMsg.style.display = 'none';

        try {
            const serviceID = 'service_4q2a8zg';
            const templateID = 'template_waitlist';

            // On envoie les données attendues par votre template HTML
            await emailjs.send(serviceID, templateID, {
                email: emailInput.value,
                time: new Date().toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')
            });

            const msg = {
                fr: "Merci ! Nous vous tiendrons informé.",
                en: "Thanks! We'll notify you.",
                nl: "Bedankt! We houden je op de hoogte."
            };

            statusMsg.textContent = msg[lang] || msg['en'];
            statusMsg.style.color = '#3DDC84';
            statusMsg.style.display = 'block';
            waitlistForm.reset();
        } catch (error) {
            console.error("Erreur waitlist:", error);
            statusMsg.textContent = "Error. Please try again.";
            statusMsg.style.color = '#ff4444';
            statusMsg.style.display = 'block';
        } finally {
            btn.disabled = false;
            btn.style.opacity = '1';
        }
    });
}
