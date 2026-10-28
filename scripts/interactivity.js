// ========================================
// INTERACTIVITY UPGRADE - Gabriel Krull Portfolio
// Animações, Eye Tracker, Modo Retrô
// ========================================

(function() {
    'use strict';
    
    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // ========================================
    // SCROLL REVEAL
    // ========================================
    function initScrollReveal() {
        if (prefersReducedMotion) {
            // Show all elements immediately
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
                el.classList.add('active');
            });
            return;
        }
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            observer.observe(el);
        });
    }
    
    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================
    function initActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // ========================================
    // EYE TRACKER - Inspired by hancore.dev
    // ========================================
    function initEyeTracker() {
        if (prefersReducedMotion || window.innerWidth < 968) {
            return;
        }
        
        const eyeTracker = document.getElementById('eyeTracker');
        const heroVisualTrigger = document.getElementById('hero-visual-trigger');
        
        if (!eyeTracker || !heroVisualTrigger) {
            return;
        }
        
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        let isInZone = false;
        let animationId = null;
        
        heroVisualTrigger.addEventListener('mouseenter', () => {
            isInZone = true;
            eyeTracker.classList.add('active');
            if (!animationId) {
                startTracking();
            }
        });
        
        heroVisualTrigger.addEventListener('mouseleave', () => {
            isInZone = false;
            eyeTracker.classList.remove('active');
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function startTracking() {
            function updateEye() {
                if (!isInZone) {
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                    return;
                }
                
                const rect = eyeTracker.getBoundingClientRect();
                const eyeCenterX = rect.left + rect.width / 2;
                const eyeCenterY = rect.top + rect.height / 2;
                
                const dx = mouseX - eyeCenterX;
                const dy = mouseY - eyeCenterY;
                
                currentX += dx * 0.15;
                currentY += dy * 0.15;
                
                // Limit movement
                const maxDist = 20;
                const dist = Math.sqrt(currentX * currentX + currentY * currentY);
                if (dist > maxDist) {
                    currentX = (currentX / dist) * maxDist;
                    currentY = (currentY / dist) * maxDist;
                }
                
                eyeTracker.style.left = (mouseX - dx * 0.3) + currentX * 0.5 + 'px';
                eyeTracker.style.top = (mouseY - dy * 0.3) + currentY * 0.5 + 'px';
                
                animationId = requestAnimationFrame(updateEye);
            }
            updateEye();
        }
        
        // Initialize position
        const triggerRect = heroVisualTrigger.getBoundingClientRect();
        eyeTracker.style.left = triggerRect.left + triggerRect.width / 2 + 'px';
        eyeTracker.style.top = triggerRect.top + triggerRect.height / 2 + 'px';
    }
    
    // ========================================
    // RETRO MODE TOGGLE
    // ========================================
    function initRetroMode() {
        const retroToggleBtn = document.getElementById('retroToggleBtn');
        const html = document.documentElement;
        
        if (!retroToggleBtn) return;
        
        // Check saved preference
        const savedRetro = localStorage.getItem('retroMode') === 'true';
        if (savedRetro) {
            html.setAttribute('data-theme', 'retro');
            if (retroToggleBtn.querySelector('span')) {
                retroToggleBtn.querySelector('span').textContent = '[ RETURN TO TIMELINE ]';
            }
        }
        
        retroToggleBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            
            if (currentTheme === 'retro') {
                const savedTheme = localStorage.getItem('theme') || 'light';
                html.setAttribute('data-theme', savedTheme);
                if (retroToggleBtn.querySelector('span')) {
                    retroToggleBtn.querySelector('span').textContent = '[ THERE IS ANOTHER TIMELINE ]';
                }
                localStorage.setItem('retroMode', 'false');
            } else {
                localStorage.setItem('theme', currentTheme);
                html.setAttribute('data-theme', 'retro');
                if (retroToggleBtn.querySelector('span')) {
                    retroToggleBtn.querySelector('span').textContent = '[ RETURN TO TIMELINE ]';
                }
                localStorage.setItem('retroMode', 'true');
            }
        });
    }
    
    // ========================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ========================================
    // COPY EMAIL FUNCTIONALITY
    // ========================================
    function initCopyEmail() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const email = link.getAttribute('href').replace('mailto:', '');
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(email).then(() => {
                        const originalText = link.textContent;
                        link.textContent = 'E-mail copiado!';
                        setTimeout(() => {
                            link.textContent = originalText;
                        }, 2000);
                    });
                }
            });
        });
    }
    
    // ========================================
    // INITIALIZE ALL
    // ========================================
    function init() {
        initScrollReveal();
        initActiveNavLink();
        initEyeTracker();
        initRetroMode();
        initSmoothScroll();
        initCopyEmail();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
