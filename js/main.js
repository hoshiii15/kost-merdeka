// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Sync Lenis with GSAP ScrollTrigger (OPTIMIZED - no duplicate raf)
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// Better lag smoothing
gsap.ticker.lagSmoothing(1000, 16);

// ============================================
// HERO SECTION ANIMATIONS
// ============================================

// Hero title animation on load
gsap.from('.hero__title-line', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out',
    delay: 0.2
});

gsap.from('.hero__subtitle', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.8
});

gsap.from('.hero__scroll-indicator', {
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 1.2
});

// Hero parallax and fade out on scroll (OPTIMIZED)
gsap.to('.hero__content', {
    y: -200,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
    }
});

gsap.to('.hero__background', {
    y: 300,
    opacity: 0.3,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
    }
});

// ============================================
// INTRO SECTION ANIMATIONS
// ============================================

gsap.from('.intro__text', {
    opacity: 0,
    y: 80,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.intro',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

gsap.from('.intro__image', {
    opacity: 0,
    x: 100,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.intro',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

// ============================================
// FASILITAS SECTION - HORIZONTAL SCROLL
// ============================================

const fasilitasSection = document.querySelector('.fasilitas');
const fasilitasContainer = document.querySelector('.fasilitas__scroll-container');

if (fasilitasSection && fasilitasContainer) {
    // Calculate the scroll width
    const getScrollAmount = () => {
        const scrollWidth = fasilitasContainer.scrollWidth;
        return -(scrollWidth - window.innerWidth);
    };

    // Pin the section and create horizontal scroll (OPTIMIZED)
    const fasilitasTween = gsap.to(fasilitasContainer, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
            trigger: '.fasilitas',
            start: 'top top',
            end: () => `+=${fasilitasContainer.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
        }
    });

    // Animate items as they come into view during horizontal scroll (OPTIMIZED)
    gsap.utils.toArray('.fasilitas__item').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            scale: 0.9,
            ease: 'none',
            scrollTrigger: {
                trigger: item,
                containerAnimation: fasilitasTween,
                start: 'left 90%',
                end: 'left 50%',
                scrub: 0.5,
            }
        });
    });
}

// ============================================
// KAMAR SECTION - IMAGE REVEAL ANIMATION
// ============================================

gsap.utils.toArray('.kamar__item').forEach((item, index) => {
    const imageReveal = item.querySelector('.kamar__image-reveal');
    const image = item.querySelector('.kamar__image');
    const info = item.querySelector('.kamar__info');

    // Create a timeline for each room (OPTIMIZED)
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: 'play none none reverse'
        }
    });

    // Image reveal effect using clip-path (OPTIMIZED)
    tl.to(imageReveal, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1,
        ease: 'power3.inOut'
    })
    .to(image, {
        scale: 1,
        duration: 1,
        ease: 'power3.inOut'
    }, 0);    // Animate info section
    gsap.from(info, {
        opacity: 0,
        x: index % 2 === 0 ? 50 : -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: item,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
});

// ============================================
// LOKASI SECTION - PIN ANIMATIONS
// ============================================

// Animate pins appearing one by one
const pins = document.querySelectorAll('.lokasi__pin');
pins.forEach((pin, index) => {
    const dot = pin.querySelector('.pin-dot');
    const label = pin.querySelector('.pin-label');

    gsap.to(dot, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.lokasi',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        delay: index * 0.2
    });

    gsap.to(label, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.lokasi',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        delay: index * 0.2 + 0.3
    });
});

// Animate location list items
const locationItems = document.querySelectorAll('.lokasi__list-item');
locationItems.forEach((item, index) => {
    gsap.to(item, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.lokasi__info',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        delay: index * 0.15
    });
});

// ============================================
// CTA SECTION - BUTTON PULSE ANIMATION
// ============================================

// Additional pulse animation for primary button on scroll into view
gsap.from('.cta__button--primary', {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
        trigger: '.cta',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

gsap.from('.cta__button--secondary', {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
        trigger: '.cta',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    delay: 0.2
});

// Animate CTA content
gsap.from('.cta__title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.cta',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

gsap.from('.cta__description', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.cta',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    delay: 0.2
});

gsap.from('.cta__info p', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.cta__info',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// ============================================
// ADDITIONAL INTERACTIONS
// ============================================

// Add hover effect to location pins
pins.forEach(pin => {
    pin.addEventListener('mouseenter', () => {
        gsap.to(pin.querySelector('.pin-dot'), {
            scale: 1.3,
            duration: 0.3,
            ease: 'power2.out'
        });
        gsap.to(pin.querySelector('.pin-label'), {
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    pin.addEventListener('mouseleave', () => {
        gsap.to(pin.querySelector('.pin-dot'), {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
        gsap.to(pin.querySelector('.pin-label'), {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Smooth anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: 0,
                duration: 2
            });
        }
    });
});

// Log when animations are ready
console.log('🎬 GSAP ScrollTrigger & Lenis initialized successfully!');
console.log('📜 Scrollytelling animations ready');

// Optimized resize handler with debounce
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// Performance monitoring (optional - remove in production)
if (window.performance) {
    console.log('⚡ Performance: Page loaded in', Math.round(performance.now()), 'ms');
}
