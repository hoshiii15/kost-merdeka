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
}// ============================================
// CINEMATIC LOCATION & ROOM SECTION
// ============================================

const cinematicSection = document.querySelector('.cinematic-section');

if (cinematicSection) {
    const anchorKost = document.querySelector('.anchor-kost-container');
    const anchorImage = document.querySelector('.anchor-image');

    // Cinematic labels
    const labelLeft = document.querySelector('.label-left');
    const labelRight = document.querySelector('.label-right');

    // Location slides
    const locationUKSW = document.querySelector('.location-uksw');
    const locationCafe = document.querySelector('.location-cafe');
    const locationMall = document.querySelector('.location-mall');
    const locationStasiun = document.querySelector('.location-stasiun');
    const locationKuliner = document.querySelector('.location-kuliner');

    // Room details
    const roomDetail1 = document.querySelector('.room-detail-1');
    const roomDetail2 = document.querySelector('.room-detail-2');

    // Create main timeline
    const cinematicTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.cinematic-section',
            start: 'top top',
            end: '+=600%', // 6x viewport height for smooth long scroll
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

        // ========== SEQUENCE 1: UKSW ==========
        // Anchor moves to left, UKSW slides in from right
        .to(anchorKost, {
            left: '25%',
            duration: 1,
            ease: 'power2.inOut'
        }, 0)
        .fromTo(locationUKSW,
            {
                right: '-100%',
                opacity: 0
            },
            {
                right: '8%',
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut'
            }, 0.3)
        .to(locationUKSW.querySelector('.location-caption'), {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, 1.2)

        // Hold for a moment
        .to({}, { duration: 0.5 })

        // ========== SEQUENCE 2: CAFE ==========
        // UKSW slides out, Anchor moves right, Cafe slides in from left
        .to(locationUKSW, {
            right: '-100%',
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut'
        })
        .to(anchorKost, {
            left: '70%',
            duration: 1,
            ease: 'power2.inOut'
        }, '<')
        .fromTo(locationCafe,
            {
                left: '-100%',
                opacity: 0
            },
            {
                left: '8%',
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut'
            }, '<0.3')
        .to(locationCafe.querySelector('.location-caption'), {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        })

        // Hold
        .to({}, { duration: 0.5 })

        // ========== SEQUENCE 3: MALL ==========
        // Cafe slides out, Anchor moves left, Mall slides in from right
        .to(locationCafe, {
            left: '-100%',
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut'
        })
        .to(anchorKost, {
            left: '25%',
            duration: 1,
            ease: 'power2.inOut'
        }, '<')
        .fromTo(locationMall,
            {
                right: '-100%',
                opacity: 0
            },
            {
                right: '8%',
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut'
            }, '<0.3')
        .to(locationMall.querySelector('.location-caption'), {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        })

        // Hold
        .to({}, { duration: 0.5 })

        // ========== SEQUENCE 4: STASIUN ==========
        // Mall slides out, Anchor moves right, Stasiun slides in from left
        .to(locationMall, {
            right: '-100%',
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut'
        })
        .to(anchorKost, {
            left: '70%',
            duration: 1,
            ease: 'power2.inOut'
        }, '<')
        .fromTo(locationStasiun,
            {
                left: '-100%',
                opacity: 0
            },
            {
                left: '8%',
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut'
            }, '<0.3')
        .to(locationStasiun.querySelector('.location-caption'), {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        })

        // Hold
        .to({}, { duration: 0.5 })

        // ========== SEQUENCE 5: KULINER ==========
        // Stasiun slides out, Anchor moves left, Kuliner slides in from right
        .to(locationStasiun, {
            left: '-100%',
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut'
        })
        .to(anchorKost, {
            left: '25%',
            duration: 1,
            ease: 'power2.inOut'
        }, '<')
        .fromTo(locationKuliner,
            {
                right: '-100%',
                opacity: 0
            },
            {
                right: '8%',
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut'
            }, '<0.3')
        .to(locationKuliner.querySelector('.location-caption'), {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        })

        // Hold
        .to({}, { duration: 0.5 })

        // ========== TRANSITION TO ROOM DETAILS ==========
        // Kuliner slides out, Anchor moves to center
        .to(locationKuliner, {
            right: '-100%',
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut'
        })
        .to(anchorKost, {
            left: '50%',
            duration: 1,
            ease: 'power2.inOut'
        }, '<')

        // Hold at center
        .to({}, { duration: 0.3 })

        // ========== ZOOM TO ROOM 1 ==========
        // Zoom in effect - scale and position
        .to(anchorKost, {
            width: '100vw',
            height: '100vh',
            top: '50%',
            left: '50%',
            duration: 1.5,
            ease: 'power2.inOut'
        })
        .to(anchorImage, {
            scale: 2,
            x: '-15%',
            y: '-10%',
            duration: 1.5,
            ease: 'power2.inOut'
        }, '<')

        // Fade to Room Detail 1
        .to(roomDetail1, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.8,
            ease: 'power2.inOut'
        })

        // Hold to view Room 1
        .to({}, { duration: 1 })

        // ========== ZOOM OUT AND ZOOM TO ROOM 2 ==========
        // Fade out Room 1 detail
        .to(roomDetail1, {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.5,
            ease: 'power2.inOut'
        })

        // Zoom out to full building
        .to(anchorImage, {
            scale: 1,
            x: '0%',
            y: '0%',
            duration: 1,
            ease: 'power2.inOut'
        })
        .to(anchorKost, {
            width: '600px',
            height: '400px',
            duration: 1,
            ease: 'power2.inOut'
        }, '<')

        // Brief hold
        .to({}, { duration: 0.3 })

        // Zoom in to Room 2 (different window)
        .to(anchorKost, {
            width: '100vw',
            height: '100vh',
            duration: 1.5,
            ease: 'power2.inOut'
        })
        .to(anchorImage, {
            scale: 2,
            x: '15%',
            y: '10%',
            duration: 1.5,
            ease: 'power2.inOut'
        }, '<')

        // Fade to Room Detail 2
        .to(roomDetail2, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.8,
            ease: 'power2.inOut'
        })

        // Hold to view Room 2
        .to({}, { duration: 1 })

        // ========== FINAL: ZOOM OUT ==========
        // Fade out Room 2
        .to(roomDetail2, {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.5,
            ease: 'power2.inOut'
        })

        // Zoom out to normal
        .to(anchorImage, {
            scale: 1,
            x: '0%',
            y: '0%',
            duration: 1.2,
            ease: 'power2.inOut'
        })
        .to(anchorKost, {
            width: '600px',
            height: '400px',
            duration: 1.2,
            ease: 'power2.inOut'
        }, '<')

        // Fade out entire section
        .to(cinematicSection, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut'
        });

    console.log('🎬 Cinematic section initialized with', cinematicTimeline.duration(), 'second duration');
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
