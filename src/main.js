import '../style.css';
import { initTheme } from './theme.js';
import { initLanguage } from './i18n.js';
import { showCookieBanner } from './cookies.js';
import { setupMobileMenu, setupScrollAnimations, setupBackToTopButton, setupSharing } from './ui.js';
import { setupContactForm } from './form.js';

// --- Initialisation ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();

    setupMobileMenu();
    setupScrollAnimations();
    setupBackToTopButton();
    setupSharing();
    showCookieBanner();
    setupContactForm();
});
