document.addEventListener('DOMContentLoaded', () => {

    /* =======================================
       1. Mobile Menu Toggle
    ======================================= */
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // A11y
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    /* =======================================
       2. Header Scroll Effect
    ======================================= */
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =======================================
       3. Intersection Observer (Active Links)
    ======================================= */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger trigger when section is half way
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let id = entry.target.getAttribute('id');
                // Remove active class from all links
                navItems.forEach(link => {
                    link.classList.remove('active');
                });
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if(activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* =======================================
       4. Hero Glass Tilt Effect (Vanilla JS)
    ======================================= */
    const heroContainer = document.getElementById('hero');
    const tiltElement = document.querySelector('.glass-isologo');

    // Only apply on non-touch devices (Desktop)
    if (heroContainer && tiltElement && window.matchMedia("(hover: hover)").matches) {
        heroContainer.addEventListener('mousemove', (e) => {
            const rect = heroContainer.getBoundingClientRect();
            // Calculate mouse position relative to center of the hero section (-1 to 1)
            const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

            // Subtle rotation (max 15 degrees)
            const rotateY = x * 15;
            const rotateX = -y * 15; // Invert Y axis

            tiltElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Reset when mouse leaves
        heroContainer.addEventListener('mouseleave', () => {
            tiltElement.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            tiltElement.style.transition = `transform 0.5s ease-out`;
        });
        
        // Remove transition during mousemove for instant feedback
        heroContainer.addEventListener('mouseenter', () => {
             tiltElement.style.transition = `none`;
        });
    }

    /* =======================================
       5. GSAP Scroll Animations
    ======================================= */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Fade in sections as they scroll
        const scrollSections = document.querySelectorAll('.section-scroll');
        
        scrollSections.forEach((section) => {
            gsap.fromTo(section, 
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%", // Trigger when top of section is 85% down viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Staggered cards animation (Servicios & Especialidad)
        const grids = document.querySelectorAll('.grid-3');
        grids.forEach((grid) => {
            const cards = grid.children;
            gsap.fromTo(cards,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 85%"
                    }
                }
            );
        });
        
        // Newsletter form submission prevention (dummy logic)
        const newsletterForm = document.getElementById('newsletter-form');
        if(newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('¡Suscripción simulada enviada con éxito!');
                newsletterForm.reset();
            });
        }
    } else {
        console.warn("GSAP / ScrollTrigger no detectado. Las animaciones al scroll están desactivadas.");
        // Fallback: Mostrar todo para evitar elementos ocultos
        document.querySelectorAll('.section-scroll').forEach(s => {
            s.style.opacity = '1';
            s.style.transform = 'none';
        });
    }
});
