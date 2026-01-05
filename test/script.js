document.addEventListener('DOMContentLoaded', () => {

    // --- Protection: Disable Right-Click and Image Download ---
    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Disable keyboard shortcuts (F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, etc.)
    document.addEventListener('keydown', (e) => {
        // Disable F12 (Developer Tools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+S (Save Page)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+P (Print - can be used to save as PDF)
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return false;
        }
    });

    // Disable image dragging
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Disable image selection
    document.addEventListener('selectstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Add overlay to images to prevent right-click
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        // Disable drag
        img.setAttribute('draggable', 'false');
        // Add CSS to prevent selection
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
        img.style.mozUserSelect = 'none';
        img.style.msUserSelect = 'none';
        // Prevent context menu
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    });

    // Disable text selection (optional - uncomment if needed)
    // document.addEventListener('selectstart', (e) => {
    //     e.preventDefault();
    //     return false;
    // });

    // --- Preloader ---
    const loaderWrapper = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loaderWrapper) {
                loaderWrapper.style.opacity = '0';
                loaderWrapper.style.visibility = 'hidden';
            }
            document.body.style.overflow = 'auto'; 
            
            // Show cookie consent after page loads
            showCookieConsent();
        }, 2000);
    });

    // --- Cookie Consent Box - Enhanced with Smooth Animations ---
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');

    // Check if user has already made a choice
    function hasCookieConsent() {
        return localStorage.getItem('cookieConsent') !== null;
    }

    // Show cookie consent box with smooth animation
    function showCookieConsent() {
        if (!hasCookieConsent() && cookieConsent) {
            // Small delay to ensure smooth animation after loader
            setTimeout(() => {
                cookieConsent.classList.add('show');
                // Add fade-in animation to content
                const content = cookieConsent.querySelector('.cookie-content');
                if (content) {
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }, 50);
                }
            }, 500);
        }
    }

    // Hide cookie consent box with smooth animation
    function hideCookieConsent() {
        if (cookieConsent) {
            const content = cookieConsent.querySelector('.cookie-content');
            if (content) {
                content.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
            }
            // Remove show class after animation
            setTimeout(() => {
                cookieConsent.classList.remove('show');
                if (content) {
                    content.style.opacity = '';
                    content.style.transform = '';
                    content.style.transition = '';
                }
            }, 400);
        }
    }

    // Accept cookies with button animation
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Add click animation
            acceptCookiesBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                acceptCookiesBtn.style.transform = '';
                localStorage.setItem('cookieConsent', 'accepted');
                hideCookieConsent();
            }, 150);
        });
    }

    // Decline cookies with button animation
    if (declineCookiesBtn) {
        declineCookiesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Add click animation
            declineCookiesBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                declineCookiesBtn.style.transform = '';
                localStorage.setItem('cookieConsent', 'declined');
                hideCookieConsent();
            }, 150);
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    const logo = document.getElementById('logo');
    
    // Skip logo change for index2.html (gallery page)
    const isGalleryPage = window.location.pathname.includes('index2.html');
    
    if (!isGalleryPage) {
        // Detect correct path based on current page location
        const pathPrefix = window.location.pathname.includes('/assets/pages/') ? '../' : 'assets/';
        const logoOriginal = pathPrefix + 'images/white-logo.png';
        const logoScrolled = pathPrefix + 'images/beige-logo.png';
        
        if (header && logo) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                    logo.src = logoScrolled;
                } else {
                    header.classList.remove('scrolled');
                    logo.src = logoOriginal;
                }
            });
        }
    }

    // --- Mobile Menu ---
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const overlay = document.getElementById('overlay');
    const menuLinks = document.querySelectorAll('#overlay .menu-link');

    const openMenu = () => {
        if (overlay) overlay.classList.add('show');
        menuLinks.forEach(link => {
            if (link.classList.contains('slide-up')) {
                link.classList.add('visible');
            }
        });
        // Trap focus to the close button for accessibility
        if (closeIcon) closeIcon.focus();
        // Disable page scroll while menu is open
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        if (overlay) overlay.classList.remove('show');
        menuLinks.forEach(link => {
            if (link.classList.contains('slide-up')) {
                link.classList.remove('visible');
            }
        });
        // Re-enable page scroll
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    };

    if (menuIcon) {
        menuIcon.addEventListener('click', openMenu);
    }

    if (closeIcon) {
        closeIcon.addEventListener('click', closeMenu);
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
        // set active state
        link.addEventListener('click', () => {
            document.querySelectorAll('#menu .menu-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeMenu();
            }
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('show')) {
            closeMenu();
        }
    });

    // (removed old basic smooth scroll to avoid double-handling)

    // --- On-Scroll Animations ---
    const animatedElements = document.querySelectorAll('.scale-in, .slide-in-right, .slide-in-left, .slide-up, [data-aos]');

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to trigger CSS animation/transition
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // --- Counter Animation ---
    const projectCounter = document.getElementById('project-counter');

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter-number');
                counters.forEach(counter => {
                    counter.innerText = '0';
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    let start = null;

                    const step = (timestamp) => {
                        if (!start) start = timestamp;
                        const progress = Math.min((timestamp - start) / duration, 1);
                        counter.innerText = Math.floor(progress * target);
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        } else {
                             counter.innerText = target; // Ensure it ends on the exact target
                        }
                    };
                    window.requestAnimationFrame(step);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    if (projectCounter) {
        counterObserver.observe(projectCounter);
    }

    // --- Home Slideshow ---
    const slides = document.querySelectorAll('.home .slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        // Set the first slide as active initially
        slides[currentSlide].classList.add('active');

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change slide every 5 seconds
    }

    // --- Parallax Effect for Service Backgrounds ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSections = document.querySelectorAll('#interior-design, #landscape, #exterior');
        
        parallaxSections.forEach(section => {
            const bg = section.querySelector('.service-background');
            if (bg) {
                // Check if the section is in the viewport
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    const speed = 0.4;
                    const yPos = -(scrolled - section.offsetTop) * speed;
                    bg.style.transform = `translate3d(0px, ${yPos}px, 0px)`;
                }
            }
        });
    });

    // --- FAQ Toggle Functionality ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');

            // hint removed per request
        });
    });

    // --- Enhanced Testimonials Animation ---
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    const testimonialObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        testimonialObserver.observe(card);
    });

    // --- Service Features Animation ---
    const serviceFeatures = document.querySelectorAll('.feature');
    
    const featureObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    serviceFeatures.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px) scale(0.9)';
        feature.style.transition = `all 0.5s ease ${index * 0.1}s`;
        featureObserver.observe(feature);
    });

    // --- About Stats Animation ---
    const aboutStats = document.querySelectorAll('.stat-item');
    
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    aboutStats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px)';
        stat.style.transition = `all 0.6s ease ${index * 0.2}s`;
        statsObserver.observe(stat);
    });

    // --- Enhanced Accessibility ---
    // Add keyboard navigation for FAQ
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
        
        // Add ARIA attributes
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            question.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    });

    // --- Performance Optimization ---
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // --- Hide floating icons when contact section visible ---
    const contactSection = document.getElementById('contact-us');
    const bookingIcon = document.querySelector('.booking-icon');
    const whatsappIcon = document.querySelector('.whatsapp-icon');

    if (contactSection && (bookingIcon || whatsappIcon)) {
        const visibilityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const shouldHide = entry.isIntersecting;
                if (bookingIcon) bookingIcon.classList.toggle('is-hidden', shouldHide);
                if (whatsappIcon) whatsappIcon.classList.toggle('is-hidden', shouldHide);
            });
        }, { threshold: 0.1 });
        visibilityObserver.observe(contactSection);
    }

    // --- Smooth Scrolling Enhancement ---
    // Add offset for fixed header
    const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const basePosition = Math.max(0, targetElement.offsetTop - headerHeight);
                const extraOffset = ['#interior-design', '#landscape', '#exterior', '#faq'].includes(targetId) ? 40 : 0;
                const targetPosition = basePosition + extraOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Professional Map Initialization ---
    const mapContainer = document.getElementById('professional-map');
    if (mapContainer && typeof L !== 'undefined') {
        // Wait for map container to be visible before initializing
        const mapObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    
                    // Initialize the map with Ramallah coordinates
                    const map = L.map('professional-map', {
                        center: [31.9048, 35.2038], // Ramallah coordinates
                        zoom: 15,
                        zoomControl: true,
                        scrollWheelZoom: true,
                        attributionControl: true
                    });

                    // Custom tile layer with elegant styling
                    // Using CartoDB Positron for a clean, professional look
                    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                        subdomains: 'abcd',
                        maxZoom: 19
                    }).addTo(map);

                    // Create elegant custom marker without background circle
                    const customIcon = L.divIcon({
                        className: 'custom-marker',
                        html: `
                            <div style="
                                position: relative;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                animation: markerFloat 3s ease-in-out infinite;
                            ">
                                <svg width="35" height="30" viewBox="0 0 50 45" style="filter: drop-shadow(0 3px 10px rgba(166, 124, 82, 0.5));">
                                    <!-- Elegant pin shape with gradient -->
                                    <defs>
                                        <linearGradient id="pinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style="stop-color:#a67c52;stop-opacity:1" />
                                            <stop offset="100%" style="stop-color:#8b6b4a;stop-opacity:1" />
                                        </linearGradient>
                                        <filter id="glow">
                                            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                                            <feMerge>
                                                <feMergeNode in="coloredBlur"/>
                                                <feMergeNode in="SourceGraphic"/>
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <!-- Main pin body - shorter height -->
                                    <path d="M25 0 C32 0 38 5 38 15 C38 24 25 45 25 45 C25 45 12 24 12 15 C12 5 18 0 25 0 Z" 
                                          fill="url(#pinGradient)" 
                                          stroke="#ffffff" 
                                          stroke-width="1.5"
                                          filter="url(#glow)"/>
                                    <!-- Inner highlight circle -->
                                    <circle cx="25" cy="15" r="9" fill="#ffffff" opacity="0.3"/>
                                    <!-- Center dot -->
                                    <circle cx="25" cy="15" r="5.5" fill="#ffffff"/>
                                    <circle cx="25" cy="15" r="3" fill="#a67c52"/>
                                </svg>
                                <style>
                                    @keyframes markerFloat {
                                        0%, 100% { 
                                            transform: translateY(0) scale(1);
                                        }
                                        50% { 
                                            transform: translateY(-5px) scale(1.04);
                                        }
                                    }
                                </style>
                            </div>
                        `,
                        iconSize: [35, 30],
                        iconAnchor: [17.5, 30],
                        popupAnchor: [0, -30]
                    });

                    // Add marker with custom icon
                    const marker = L.marker([31.9048, 35.2038], { icon: customIcon }).addTo(map);

                    // Create beautiful popup content - smaller size
                    const popupContent = `
                        <div style="text-align: center;">
                            <h3 style="margin: 0 0 0.3rem 0; color: #a67c52; font-family: 'Playfair Display', serif; font-size: 0.95rem; font-weight: 600;">Samar Ammar Interior Design</h3>
                            <p style="margin: 0.3rem 0; color: #555555; font-size: 0.75rem; line-height: 1.4;">
                                <i class='bx bx-map' style="color: #a67c52; margin-right: 4px; font-size: 0.85rem;"></i>
                                Ahlia College Street, Al-Asaad Building, 3rd Floor
                            </p>
                            <p style="margin: 0.3rem 0; color: #555555; font-size: 0.75rem; line-height: 1.4;">
                                <i class='bx bx-map-pin' style="color: #a67c52; margin-right: 4px; font-size: 0.85rem;"></i>
                                Ramallah, Palestine
                            </p>
                            <a href="https://www.google.com/maps/dir/?api=1&destination=31.9048,35.2038" 
                               target="_blank" 
                               style="
                                   display: inline-block;
                                   margin-top: 0.5rem;
                                   padding: 0.4rem 0.8rem;
                                   background: linear-gradient(135deg, #a67c52 0%, #8b6b4a 100%);
                                   color: white;
                                   text-decoration: none;
                                   border-radius: 15px;
                                   font-size: 0.75rem;
                                   transition: transform 0.3s ease;
                               "
                               onmouseover="this.style.transform='scale(1.05)'"
                               onmouseout="this.style.transform='scale(1)'">
                                <i class='bx bx-directions' style="margin-right: 4px; font-size: 0.8rem;"></i>
                                Get Directions
                            </a>
                        </div>
                    `;

                    marker.bindPopup(popupContent, {
                        maxWidth: 220,
                        className: 'custom-popup',
                        closeButton: false
                    });

                    // Smooth zoom animation on load
                    setTimeout(() => {
                        map.setView([31.9048, 35.2038], 16, {
                            animate: true,
                            duration: 1.5
                        });
                    }, 300);
                }
            });
        }, { threshold: 0.1 });

        mapObserver.observe(mapContainer);
    }

});