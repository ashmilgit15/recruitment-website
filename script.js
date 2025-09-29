// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isHidden = mobileMenu.hasAttribute('hidden');
        if (isHidden) {
            mobileMenu.removeAttribute('hidden');
            hamburger.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenu.setAttribute('hidden', '');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.length > 1) {
            const el = document.querySelector(targetId);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (!mobileMenu.hasAttribute('hidden')) {
                    mobileMenu.setAttribute('hidden', '');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
});

// Theme toggle + persistence
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    root.classList.add('light');
}
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        root.classList.toggle('light');
        localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
        themeToggle.textContent = root.classList.contains('light') ? '🌙' : '☀️';
    });
    themeToggle.textContent = root.classList.contains('light') ? '🌙' : '☀️';
}

// Reveal on scroll
const revealEls = Array.from(document.querySelectorAll('.reveal'));
const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Hide fallback initial when image loads or exists
const profileImg = document.querySelector('.profile-photo');
const profileFallback = document.querySelector('.profile-circle');
function hideFallbackIfImageOk() {
    if (profileImg && profileImg.complete && profileImg.naturalWidth > 0) {
        if (profileFallback) profileFallback.style.display = 'none';
    }
}
if (profileImg) {
    profileImg.addEventListener('load', hideFallbackIfImageOk);
    profileImg.addEventListener('error', () => {
        if (profileFallback) profileFallback.style.display = 'grid';
    });
    hideFallbackIfImageOk();
}


