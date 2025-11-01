// ============================================
// LENIS SMOOTH SCROLL INITIALIZATION
// ============================================

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
});

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
// SEAMLESS SCROLLYTELLING ANIMATION
// ============================================

const mainContainer = document.querySelector('.scrollytelling-container');

if (mainContainer) {
    // Elements
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const allClouds = document.querySelectorAll('.cloud');
    const mainLabels = document.querySelector('.main-labels');
    const labelLeft = document.querySelector('.label-left');
    const labelRight = document.querySelector('.label-right');
    const skyBg = document.querySelector('.sky-bg');
    const cityBg = document.querySelector('.city-bg');
    const sideLeft = document.querySelector('.side-left');
    const sideRight = document.querySelector('.side-right');
    const anchorMain = document.querySelector('.anchor-main');
    const balairungSlide = document.querySelector('.balairung-slide');
    const spbuSlide = document.querySelector('.spbu-slide');
    const tollSlide = document.querySelector('.toll-slide');

    // Create unified seamless timeline
    const mainTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.scrollytelling-container',
            start: 'top top',
            end: '+=800%', // 8x viewport height for all slides
            pin: true,
            scrub: 1,
            anticipatePin: 1,
        }
    });

    // ========== PHASE 1: OPENING (0-25% scroll) ==========
    mainTimeline
        // Scroll indicator fades immediately
        .to(scrollIndicator, {
            opacity: 0,
            y: 20,
            duration: 0.1,
            ease: 'power2.out'
        }, 0)

        // Clouds drift down and fade
        .to(allClouds, {
            y: '100vh',
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
            stagger: 0.02
        }, 0.05)

        // Background transition
        .to(skyBg, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.inOut'
        }, 0.1)
        .to(cityBg, {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.inOut'
        }, 0.1)

        // Side images slide out
        .to(sideLeft, {
            x: '-120%',
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in'
        }, 0.15)
        .to(sideRight, {
            x: '120%',
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in'
        }, 0.15)

        // Labels stay visible (already at opacity 1 in CSS)
        .to(mainLabels, {
            opacity: 1,
            duration: 0.1,
            ease: 'power2.out'
        }, 0.2)

        // ========== PHASE 2: TRANSITION (25-50% scroll) ==========
        // Hold anchor in center briefly with subtle pulse
        .to(anchorMain, {
            scale: 1.05,
            duration: 0.1,
            ease: 'power1.inOut'
        }, 0.35)

        // ========== PHASE 3: BALAIRUNG REVEAL (50-62.5% scroll) ==========
        // Anchor scales down and moves far right
        .to(anchorMain, {
            x: '90%',
            scale: 0.6,
            duration: 0.15,
            ease: 'power2.inOut'
        }, 0.5)

        // Balairung slides in from left simultaneously
        .fromTo(balairungSlide, {
            left: '-100%',
            opacity: 0
        }, {
            left: '5%',
            opacity: 1,
            duration: 0.15,
            ease: 'power2.inOut'
        }, 0.5)

        // Hold Balairung
        .to({}, { duration: 0.1 }, 0.65)

        // ========== PHASE 4: BALAIRUNG EXIT & SPBU ENTER (62.5-75% scroll) ==========
        // Balairung slides out to left
        .to(balairungSlide, {
            left: '-100%',
            opacity: 0,
            duration: 0.15,
            ease: 'power2.inOut'
        }, 0.75)

        // Anchor moves back to center and restore scale
        .to(anchorMain, {
            x: '0%',
            scale: 1,
            duration: 0.15,
            ease: 'power2.inOut'
        }, 0.75)

        // SPBU slides in from right
        .fromTo(spbuSlide, {
            right: '-100%',
            opacity: 0
        }, {
            right: '5%',
            opacity: 1,
            duration: 0.15,
            ease: 'power2.inOut'
        }, 0.8)

        // Anchor moves far left and scales down for SPBU
        .to(anchorMain, {
            x: '-90%',
            scale: 0.6,
            duration: 0.15,
            ease: 'power2.inOut'
        }, 0.8)

        // Hold SPBU
        .to({}, { duration: 0.1 }, 0.9)

        // ========== PHASE 5: SPBU EXIT & TOLL ENTER (87.5-100% scroll) ==========
        // SPBU slides out to right
        .to(spbuSlide, {
            right: '-100%',
            opacity: 0,
            duration: 0.15,
            ease: 'power2.inOut'
        }, 0.95)

        // Anchor moves back to center and restore scale
        .to(anchorMain, {
            x: '0%',
            scale: 1,
            duration: 0.15,
            ease: 'power2.inOut'
        }, 0.95)

        // Toll Gate slides in from left
        .fromTo(tollSlide, {
            left: '-100%',
            opacity: 0
        }, {
            left: '5%',
            opacity: 1,
            duration: 0.15,
            ease: 'power2.inOut'
        }, 1.0)

        // Anchor moves far right and scales down for Toll
        .to(anchorMain, {
            x: '90%',
            scale: 0.6,
            duration: 0.15,
            ease: 'power2.inOut'
        }, 1.0)

        // Hold final state
        .to({}, { duration: 0.15 });

    console.log('🎬 Seamless scrollytelling initialized - 800% scroll distance with all locations');
}

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
