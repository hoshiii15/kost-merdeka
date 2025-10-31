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

    // Create unified seamless timeline
    const mainTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.scrollytelling-container',
            start: 'top top',
            end: '+=400%', // 4x viewport height for smooth continuous scroll
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

    // ========== PHASE 3: BALAIRUNG REVEAL (50-100% scroll) ==========
        // Anchor moves right
        .to(anchorMain, {
            x: '35%',
            duration: 0.3,
            ease: 'power2.inOut'
        }, 0.5)
        
        // Balairung slides in from left simultaneously
        .fromTo(balairungSlide, {
            left: '-100%',
            opacity: 0
        }, {
            left: '8%',
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut'
        }, 0.5)

        // Hold the final state
        .to({}, { duration: 0.2 });

    console.log('🎬 Seamless scrollytelling initialized - 400% scroll distance');
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
