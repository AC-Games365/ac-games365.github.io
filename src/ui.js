export function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    
    if (btn && menu) {
        btn.setAttribute('aria-expanded', 'false');
        btn.addEventListener('click', () => {
            const open = menu.classList.toggle('open');
            btn.setAttribute('aria-expanded', String(open));
        });
        
        // Fermer le menu mobile quand on clique sur un lien
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

export function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

export function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Native sharing or fallback to clipboard
 */
export function setupSharing() {
    window.shareGame = async (title) => {
        const shareData = {
            title: title + ' - AC World',
            text: `Check out ${title}, an awesome mobile game by AC World!`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.log('Error sharing:', err);
        }
    };
}

// Mobile download button: only shown once the page's own download buttons are off screen.
export function setupStickyDownload() {
    const sticky = document.querySelector('.sticky-cta');
    if (!sticky || !('IntersectionObserver' in window)) return;

    const watched = document.querySelectorAll('.gh, .cta-sec, .site-footer');
    const inView = new Set();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => entry.isIntersecting ? inView.add(entry.target) : inView.delete(entry.target));
        const show = inView.size === 0 && !document.getElementById('cookie-banner');
        sticky.classList.toggle('visible', show);
        sticky.setAttribute('aria-hidden', String(!show));
        sticky.tabIndex = show ? 0 : -1;
    });
    watched.forEach(el => observer.observe(el));
}

// Reports store clicks to Google Analytics, so the site's real effect can be measured.
export function setupStoreClickTracking() {
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href*="play.google.com/store/apps/details"]');
        if (!link || typeof window.gtag !== 'function') return;
        const game = new URL(link.href).searchParams.get('id');
        window.gtag('event', 'store_click', { game, page: location.pathname });
    });
}
