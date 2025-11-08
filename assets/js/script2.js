// Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // --- Preloader ---
    const loaderWrapper = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loaderWrapper) {
                loaderWrapper.style.opacity = '0';
                loaderWrapper.style.visibility = 'hidden';
            }
            document.body.style.overflow = 'auto'; 
        }, 2000);
    });

    // Filter functionality
    const filterBtns = document.querySelectorAll('.sharp-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const sectionHeaders = document.querySelector('.section-headers');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            let visibleIndex = 0;
            
            // Update body classes for section headers
            document.body.classList.remove('showing-interior', 'showing-exterior', 'showing-landscape');
            if (filter !== 'all') {
                document.body.classList.add(`showing-${filter}`);
            }
            
            // Show/hide section headers (only if element exists)
            if (sectionHeaders) {
                if (filter === 'all') {
                    sectionHeaders.style.display = 'none';
                } else {
                    sectionHeaders.style.display = 'block';
                }
            }
            
            // Reset all items first
            galleryItems.forEach((item) => {
                item.classList.remove('show', 'fade-in-up');
                item.style.animationDelay = '';
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
            });
            
            // Show filtered items with animation
            galleryItems.forEach((item, idx) => {
                const itemCategory = item.getAttribute('data-category');
                const isCompleted = item.getAttribute('data-completed') === 'true';
                
                let shouldShow = false;
                if (filter === 'all') {
                    shouldShow = true;
                } else if (filter === 'completed') {
                    // عرض الكروت التي عندها data-completed="true" فقط
                    shouldShow = isCompleted;
                } else {
                    shouldShow = itemCategory === filter;
                }
                
                if (shouldShow) {
                    item.style.display = '';
                    
                    // Add staggered animation delay
                    setTimeout(() => {
                        item.classList.add('show');
                        item.classList.add('fade-in-up');
                        item.style.animationDelay = (visibleIndex * 100) + 'ms';
                        visibleIndex++;
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Normalize cover images and add photo count badges
    (function initCoversAndBadges() {
        galleryItems.forEach(item => {
            const imgEl = item.querySelector('img');
            let images = [];
            try {
                const attr = item.getAttribute('data-lightbox-images') || '[]';
                images = JSON.parse(attr);
            } catch (e) { images = []; }

            // Preserve author-provided cover if present; otherwise set from first image
            if (!item.dataset.cover && images.length > 0) {
                item.dataset.cover = images[0];
            }
            // Apply cover to the card image if available
            if (item.dataset.cover && imgEl) {
                imgEl.src = item.dataset.cover;
                imgEl.removeAttribute('data-src');
                imgEl.classList.remove('lazy');
            }

            // Add a small photo count badge
            const card = item.querySelector('.gallery-card');
            if (card && images.length > 0 && !card.querySelector('.photo-badge')) {
                const badge = document.createElement('span');
                badge.className = 'photo-badge';
                // English label with basic pluralization
                const count = images.length;
                badge.textContent = count + ' ' + (count === 1 ? 'photo' : 'photos');
                card.appendChild(badge);
            }

            // Expose count for easier manual editing/reference
            if (images.length > 0) {
                item.setAttribute('data-images-count', String(images.length));
            }
        });
    })();

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxIndicator = document.querySelector('.lightbox-indicator');
    const closeBtn = document.querySelector('.lightbox-close');
    const nextBtn = document.querySelector('.lightbox-next');
    const prevBtn = document.querySelector('.lightbox-prev');
    
    let currentIndex = 0;
    let currentImageIndex = 0;
    let currentImages = [];
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    
    function updateIndicator() {
        lightboxIndicator.innerHTML = '';
        if (currentImages.length > 1) {
            for (let i = 0; i < currentImages.length; i++) {
                const dot = document.createElement('div');
                dot.className = `dot ${i === currentImageIndex ? 'active' : ''}`;
                dot.addEventListener('click', () => {
                    currentImageIndex = i;
                    changeImage(currentImageIndex);
                });
                lightboxIndicator.appendChild(dot);
            }
        }
    }
    
    function changeImage(newIndex) {
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';
        
        lightboxImg.onload = () => {
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        };
        
        lightboxImg.src = currentImages[newIndex];
        updateIndicator();
    }
    
    function showLightbox(itemIndex, imageIndex = 0) {
        const item = items[itemIndex];
        const lightboxImages = JSON.parse(item.getAttribute('data-lightbox-images') || '[]');
        
        if (lightboxImages.length > 0) {
            currentImages = lightboxImages;
            currentImageIndex = imageIndex;
            currentIndex = itemIndex;
            
            lightboxImg.style.opacity = '0';
            lightboxImg.style.transform = 'scale(0.95)';
            
            lightboxImg.onload = () => {
                lightboxImg.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            };
            
            lightboxImg.src = currentImages[currentImageIndex];
            lightboxImg.alt = item.querySelector('img').alt;
            lightboxCaption.innerHTML = '';
            
            lightbox.classList.remove('closing');
            lightbox.classList.add('open');
            lightbox.style.display = 'flex';
            
            // Show/hide navigation buttons based on number of images
            if (currentImages.length > 1) {
                nextBtn.style.display = 'flex';
                prevBtn.style.display = 'flex';
            } else {
                nextBtn.style.display = 'none';
                prevBtn.style.display = 'none';
            }
            
            updateIndicator();
        }
    }
    
    // Event listeners for lightbox
    items.forEach((item, idx) => {
        item.addEventListener('click', () => showLightbox(idx, 0));
    });
    
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('open');
        lightbox.classList.add('closing');
        setTimeout(() => {
            lightbox.style.display = 'none';
            lightbox.classList.remove('closing');
        }, 400);
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentImages.length > 1) {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            changeImage(currentImageIndex);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentImages.length > 1) {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            changeImage(currentImageIndex);
        }
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeBtn.click();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            }
        }
    });

    // Initial animation for all items
    setTimeout(() => {
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
                item.classList.add('fade-in-up');
                item.style.animationDelay = (index * 100) + 'ms';
            }, 100);
        });
    }, 200);

    // Page fade in animation
    document.body.classList.add('page-fade-in');
    
    // Initialize with all items visible
    if (sectionHeaders) {
        sectionHeaders.style.display = 'none';
    }

    let filter = null;
    const params = new URLSearchParams(window.location.search);
    if (params.has('filter')) {
        filter = params.get('filter');
    }
    if (!filter && window.location.hash) {
        filter = window.location.hash.replace('#', '');
    }
    if (filter) {
        const btn = document.querySelector(`.sharp-btn[data-filter='${filter}']`);
        if (btn) btn.click();
    }

    // Touch swipe for lightbox navigation
    (function() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox || !lightboxImg) return;

        let startX = 0;
        let endX = 0;

        lightbox.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) {
                startX = e.touches[0].clientX;
            }
        });

        lightbox.addEventListener('touchmove', function(e) {
            if (e.touches.length === 1) {
                endX = e.touches[0].clientX;
            }
        });

        lightbox.addEventListener('touchend', function(e) {
            if (startX && endX) {
                const diff = endX - startX;
                if (Math.abs(diff) > 50) { // Minimum swipe distance
                    if (diff > 0) {
                        // Swipe right: Previous image
                        prevBtn.click();
                    } else {
                        // Swipe left: Next image
                        nextBtn.click();
                    }
                }
            }
            startX = 0;
            endX = 0;
        });
    })();
}); 

// Animation for header on page load
window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.sharp-header').classList.add('header-animate');
}); 