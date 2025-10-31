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
// OPENING SECTION - SUBTLE FOG REVEAL
// ============================================

const openingSection = document.querySelector('.opening-section');

if (openingSection) {
    const skyBg = document.querySelector('.sky-bg');
    const cityBg = document.querySelector('.city-bg');
    const cloudLayer = document.querySelector('.cloud-layer');
    const allClouds = document.querySelectorAll('.cloud');
    const sideLeft = document.querySelector('.side-left');
    const sideRight = document.querySelector('.side-right');
    const anchorCenter = document.querySelector('.anchor-center');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const openingLabels = document.querySelectorAll('.opening-labels h1');

    // Create opening timeline
    const openingTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.opening-section',
            start: 'top top',
            end: '+=120%', // Slightly longer for smooth transition
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
        }
    });

    openingTimeline
        // Phase 1: Fade scroll indicator (0-0.2)
        .to(scrollIndicator, {
            opacity: 0,
            y: 20,
            duration: 0.2,
            ease: 'power2.out'
        }, 0)

        // Phase 2: All clouds drift downward and fade (0.2-0.7)
        .to(allClouds, {
            y: '100vh',
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            stagger: 0.03
        }, 0.2)

        // Phase 3: Labels fade out as clouds disappear (0.4-0.7)
        .to(openingLabels, {
            opacity: 0,
            y: -30,
            duration: 0.3,
            ease: 'power2.inOut'
        }, 0.4)

        // Phase 4: Background transition (0.4-0.8)
        .to(skyBg, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut'
        }, 0.4)
        .to(cityBg, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.inOut'
        }, 0.4)

        // Phase 5: Side images slide out dramatically (0.6-1.0)
        .to(sideLeft, {
            x: '-120%',
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in'
        }, 0.6)
        .to(sideRight, {
            x: '120%',
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in'
        }, 0.6)

        // Phase 6: Anchor image subtle zoom and glow (0.7-1.0)
        .to(anchorCenter, {
            scale: 1.1,
            filter: 'drop-shadow(0 50px 100px rgba(0, 0, 0, 0.5))',
            duration: 0.3,
            ease: 'power1.inOut'
        }, 0.7);
}

// ============================================
// CINEMATIC LOCATION SECTION
// ============================================

const cinematicSection = document.querySelector('.cinematic-section');

if (cinematicSection) {
    const anchorKost = document.querySelector('.anchor-kost-container');
    
    // Cinematic labels
    const labelLeft = document.querySelector('.label-left');
    const labelRight = document.querySelector('.label-right');

    // Balairung location slide
    const balairungSlide = document.querySelector('.balairung-slide');

    // Create main timeline
    const cinematicTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.cinematic-section',
            start: 'top top',
            end: '+=300%', // 3x viewport height for smooth scroll
            pin: true,
            scrub: 1,
            anticipatePin: 1,
        }
    });

    // ========== INTRO: Fade in KOST & MERDEKA labels ==========
    cinematicTimeline
        .to([labelLeft, labelRight], {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        }, 0)
    
    // ========== BALAIRUNG SLIDE: Anchor moves right, Balairung slides in ==========
        .to(anchorKost, {
            x: '40%',
            duration: 1,
            ease: 'power2.inOut'
        }, 0.5)
        .to(balairungSlide, {
            left: '8%',
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut'
        }, 0.5);

    console.log('🎬 Cinematic section initialized with balairung slide');
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
