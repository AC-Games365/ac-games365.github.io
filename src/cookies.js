import { setLanguage } from './i18n.js';

export function showCookieBanner() {
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
