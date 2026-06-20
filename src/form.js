import { getTranslation } from './i18n.js';

export function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const btn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const btnSpinner = document.getElementById('btn-spinner');
        const statusDiv = document.getElementById('form-status');
        const lang = localStorage.getItem('lang') || 'en';

        // Check if reCAPTCHA is verified
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            alert(await getTranslation(lang, 'captcha_error') || 'Please complete the reCAPTCHA verification.');
            return;
        }

        // Show loading state
        btn.disabled = true;
        btnText.classList.add('opacity-0');
        btnSpinner.classList.remove('hidden');
        statusDiv.classList.add('hidden');
        
        try {
            // Using EmailJS to send the form
            // NOTE: You need to replace these IDs with your actual EmailJS credentials
            const serviceID = 'service_4q2a8zg';
            const templateID = 'template_contactus';

            // Send form data along with the reCAPTCHA response
            await emailjs.sendForm(serviceID, templateID, this);

            // Success
            statusDiv.textContent = await getTranslation(lang, 'form_success') || 'Message sent successfully!';
            statusDiv.className = 'mb-6 p-4 rounded-lg text-center bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            contactForm.reset();
            grecaptcha.reset();

        } catch (error) {
            console.error('FAILED...', error);
            // Error
            statusDiv.textContent = await getTranslation(lang, 'form_send_error') || 'Failed to send message. Please try again.';
            statusDiv.className = 'mb-6 p-4 rounded-lg text-center bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
        } finally {
            // Reset button state
            btn.disabled = false;
            btnText.classList.remove('opacity-0');
            btnSpinner.classList.add('hidden');
            statusDiv.classList.remove('hidden');
        }
    });

    setupWaitlistForm();
}

export function setupWaitlistForm() {
    const waitlistForm = document.getElementById('waitlist-form');
    if (!waitlistForm) return;

    waitlistForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('notify-email').value;
        const btn = document.getElementById('notify-btn');
        const lang = localStorage.getItem('lang') || 'en';

        btn.disabled = true;
        btn.style.opacity = '0.7';

        try {
            // OPTION 1: EmailJS (si vous voulez recevoir un mail par inscription)
            // Créez un template 'template_waitlist' sur EmailJS et décommentez :
            await emailjs.send("service_4q2a8zg", "template_waitlist", { email: email });

            // Pour l'instant, on affiche une confirmation traduite
            const msg = {
                fr: "Merci ! Nous vous tiendrons informé.",
                en: "Thanks! We'll notify you.",
                nl: "Bedankt! We houden je op de hoogte."
            };

            alert(msg[lang] || msg['en']);
            waitlistForm.reset();
        } catch (error) {
            console.error("Erreur waitlist:", error);
        } finally {
            btn.disabled = false;
            btn.style.opacity = '1';
        }
    });
}
