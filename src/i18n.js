// Cache for loaded translations
const loadedTranslations = {};

export async function loadTranslations(lang) {
    if (loadedTranslations[lang]) {
        return loadedTranslations[lang];
    }
    
    try {
        // Dynamic import based on language
        const module = await import(`../i18n/${lang}.js`);
        loadedTranslations[lang] = module[`translations_${lang}`];
        return loadedTranslations[lang];
    } catch (e) {
        console.error(`Could not load translations for ${lang}`, e);
        // Fallback to English
        if (lang !== 'en') {
            return loadTranslations('en');
        }
        return {};
    }
}

export async function getTranslation(lang, key) {
    const translations = await loadTranslations(lang);
    return translations[key] || key;
}

export async function setLanguage(lang) {
    const translations = await loadTranslations(lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.innerHTML = translations[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            element.placeholder = translations[key];
        }
    });

    const langSelector = document.getElementById('lang-selector');
    if (langSelector) langSelector.value = lang;
    
    const langSelectorMobile = document.getElementById('lang-selector-mobile');
    if (langSelectorMobile) langSelectorMobile.value = lang;

    const cookieBannerText = document.getElementById('cookie-banner-text');
    if (cookieBannerText) cookieBannerText.innerHTML = translations['cookie_text'] || '';
    
    const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
    if (cookieAcceptBtn) cookieAcceptBtn.innerHTML = translations['cookie_accept'] || '';

    const captchaLabel = document.getElementById('captcha-label');
    if (captchaLabel) captchaLabel.innerHTML = translations['captcha_label'] || '';

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
}

export function initLanguage() {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    document.getElementById('lang-selector')?.addEventListener('change', (e) => setLanguage(e.target.value));
    document.getElementById('lang-selector-mobile')?.addEventListener('change', (e) => setLanguage(e.target.value));
}