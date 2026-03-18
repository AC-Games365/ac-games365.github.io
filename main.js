import './style.css';
import { translations_en } from './i18n/en.js';
import { translations_fr } from './i18n/fr.js';
import { translations_nl } from './i18n/nl.js';

const allTranslations = {
    en: translations_en,
    fr: translations_fr,
    nl: translations_nl
};

// --- Gestion de la langue ---
function setLanguage(lang) {
    const translations = allTranslations[lang] || allTranslations.en;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.innerHTML = translations[key];
        }
    });

    const langSelector = document.getElementById('lang-selector');
    if (langSelector) langSelector.value = lang;

    const cookieBannerText = document.getElementById('cookie-banner-text');
    if (cookieBannerText) cookieBannerText.innerHTML = translations['cookie_text'];
    const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
    if (cookieAcceptBtn) cookieAcceptBtn.innerHTML = translations['cookie_accept'];

    const captchaLabel = document.getElementById('captcha-label');
    if (captchaLabel) captchaLabel.innerHTML = translations['captcha_label'];

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
}

// --- Gestion du thème ---
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
}

// --- Gestion des cookies ---
function showCookieBanner() {
    if (localStorage.getItem('cookies_accepted')) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'fixed bottom-0 left-0 right-0 bg-gray-800 dark:bg-gray-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between shadow-lg z-50';
    banner.innerHTML = `
        <p id="cookie-banner-text" class="mb-2 sm:mb-0 sm:mr-4 text-sm"></p>
        <button id="cookie-accept-btn" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"></button>
    `;
    document.body.appendChild(banner);

    document.getElementById('cookie-accept-btn').addEventListener('click', () => {
        localStorage.setItem('cookies_accepted', 'true');
        banner.remove();
    });
    setLanguage(localStorage.getItem('lang') || 'en');
}

// --- Gestion du Captcha et du Formulaire ---
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const captchaInput = document.getElementById('captcha-answer');
        const lang = localStorage.getItem('lang') || 'en';

        if (!email || !message || !captchaInput.value) {
            alert(allTranslations[lang]['form_error']);
            return;
        }

        if (parseInt(captchaInput.value, 10) !== 7) {
            alert(allTranslations[lang]['captcha_error']);
            captchaInput.value = '';
            return;
        }

        const name = document.getElementById('name').value || 'Anonymous';
        const subject = `Message from ${name} (${email})`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        window.location.href = `mailto:contact.acgames@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// --- Initialisation ---
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    document.getElementById('lang-selector')?.addEventListener('change', (e) => setLanguage(e.target.value));
    document.getElementById('theme-toggler')?.addEventListener('click', toggleTheme);

    showCookieBanner();
    setupContactForm();
});
