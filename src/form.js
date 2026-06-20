import { getTranslation } from './i18n.js';

export function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        setupWaitlistForm(); // Si pas de formulaire contact, on cherche quand même la waitlist
        return;
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
        btnText.classList.add('opacity-0');
        btnSpinner.classList.remove('hidden');
        statusDiv.style.display = 'none';
        
        try {
            const serviceID = 'service_4q2a8zg';
            const templateID = 'template_contactus';

            await emailjs.sendForm(serviceID, templateID, this);

            statusDiv.textContent = await getTranslation(lang, 'form_success') || 'Message sent successfully!';
            statusDiv.className = 'mb-6 p-4 rounded-lg text-center bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 block';
            statusDiv.style.display = 'block';

            // Scroll to the success message so the user sees it
            statusDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

            contactForm.reset();
            grecaptcha.reset();

        } catch (error) {
            console.error('FAILED...', error);
            statusDiv.textContent = await getTranslation(lang, 'form_send_error') || 'Failed to send message.';
            statusDiv.className = 'mb-6 p-4 rounded-lg text-center bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 block';
            statusDiv.style.display = 'block';
        } finally {
            btn.disabled = false;
            btnText.classList.remove('opacity-0');
            btnSpinner.classList.add('hidden');
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
