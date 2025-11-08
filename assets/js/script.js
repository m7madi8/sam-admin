// Performance optimized JavaScript
(function() {
    'use strict';

    // Performance variables
    let scrollTimeout;
    let resizeTimeout;
    const DEBOUNCE_DELAY = 150;
    const THROTTLE_DELAY = 16; // ~60fps

    // Utility functions
    const debounce = (func, delay) => {
        return function(...args) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const throttle = (func, delay) => {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func.apply(this, args);
            }
        };
    };

    // Optimized loader
    const initLoader = () => {
        const loaderWrapper = document.querySelector('.loader-wrapper');
        if (loaderWrapper) {
            // Use requestAnimationFrame for smooth animation
            requestAnimationFrame(() => {
                loaderWrapper.classList.add('fade-out');
                setTimeout(() => {
                    loaderWrapper.style.display = 'none';
                }, 500);
            });
        }
    };

    // Optimized intersection observer for animations
    const initAnimations = () => {
        const animatedElements = document.querySelectorAll(
            '.animate-section, .slide-left, .slide-right, .fade-up, .scale-in, .rotate-in, .animate-list, .service-content, .about-image, .section-title, .section-description, .about-subtitle, .about-text'
        );

        if (!animatedElements.length) return;

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Skip animations for contact section
                if (entry.target.closest('#contact-us')) return;
                
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    entry.target.classList.add('visible');
                    
                    // For staggered animations in lists
                    if (entry.target.classList.contains('animate-list')) {
                        const children = entry.target.children;
                        Array.from(children).forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('active');
                            }, index * 100);
                        });
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        });

        animatedElements.forEach(el => {
            if (!el.closest('#contact-us')) {
                animationObserver.observe(el);
            }
        });
    };

    // Optimized button ripple effect
    const initRippleEffect = () => {
        const buttons = document.querySelectorAll('button');
        if (!buttons.length) return;

        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                // Use requestAnimationFrame for smooth animation
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        });
    };

    // Optimized smooth scroll
    const initSmoothScroll = () => {
        const anchors = document.querySelectorAll('a[href^="#"]');
        if (!anchors.length) return;

        anchors.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Optimized menu functionality
    const initMenu = () => {
        const menuIcon = document.getElementById('menu-icon');
        const overlay = document.getElementById('overlay');
        const closeMenu = document.getElementById('close-menu');

        if (menuIcon && overlay) {
            menuIcon.addEventListener('click', function () {
                overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
                overlay.classList.toggle('show');
            });
        }

        if (closeMenu && overlay) {
            closeMenu.addEventListener('click', function (event) {
                event.preventDefault();
                overlay.style.display = 'none';
                overlay.classList.remove('show');
            });
        }

        if (overlay) {
            overlay.addEventListener('click', function (event) {
                if (event.target === this) {
                    this.style.display = 'none';
                    this.classList.remove('show');
                }
            });
        }
    };

    // Optimized scroll effects
    const initScrollEffects = () => {
        const header = document.querySelector('header');
        if (!header) return;

        const handleScroll = throttle(() => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, THROTTLE_DELAY);

        window.addEventListener('scroll', handleScroll, { passive: true });
    };

    // Optimized counter animation
    const initCounterAnimation = () => {
        const counters = document.querySelectorAll('.counter-number');
        if (!counters.length) return;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    };

    // Optimized image lazy loading
    const initLazyLoading = () => {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    };

    // Optimized resize handling
    const initResizeHandler = () => {
        const handleResize = debounce(() => {
            // Handle resize events here
            console.log('Window resized');
        }, DEBOUNCE_DELAY);

        window.addEventListener('resize', handleResize, { passive: true });
    };

    // Initialize everything when DOM is ready
    const init = () => {
        document.body.classList.add("loaded");
        
        // Add animation classes
        document.querySelectorAll('#home').forEach(el => el.classList.add('animate-section'));
        document.querySelectorAll('#interior-design .service-content').forEach(el => el.classList.add('slide-left'));
        document.querySelectorAll('#landscape .service-content').forEach(el => el.classList.add('slide-right'));
        document.querySelectorAll('#engineering-supervision .service-content').forEach(el => el.classList.add('fade-up'));
        document.querySelectorAll('.gallery').forEach(el => el.classList.add('animate-list'));

        // Initialize all modules
        initAnimations();
        initRippleEffect();
        initSmoothScroll();
        initMenu();
        initScrollEffects();
        initCounterAnimation();
        initLazyLoading();
        initResizeHandler();

        // Logo click handler
        const logo = document.getElementById("logo");
        if (logo) {
            logo.addEventListener("click", function () {
                window.location.href = "#home";
            });
        }

        // Prevent context menu and drag
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }, { passive: false });
        
        document.addEventListener('dragstart', function (e) {
            e.preventDefault();
        }, { passive: false });
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Initialize loader when page is fully loaded
    if (document.readyState === 'complete') {
        initLoader();
    } else {
        window.addEventListener('load', initLoader);
    }

})();
