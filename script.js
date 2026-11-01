/* ========================================
   B.Design24 Studio — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // === Preloader ===
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 2200);
    });
    // Fallback in case load already fired
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // === Custom Cursor ===
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursorDot && cursorRing && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Enlarge cursor on interactive elements
        const interactives = document.querySelectorAll('a, button, input, select, textarea, .portfolio-item, .service-card');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.width = '12px';
                cursorDot.style.height = '12px';
                cursorRing.style.width = '60px';
                cursorRing.style.height = '60px';
                cursorRing.style.borderColor = 'rgba(200, 169, 126, 0.8)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.width = '8px';
                cursorDot.style.height = '8px';
                cursorRing.style.width = '40px';
                cursorRing.style.height = '40px';
                cursorRing.style.borderColor = 'rgba(200, 169, 126, 0.5)';
            });
        });
    }

    // === Navbar Scroll Effect ===
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top
        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveNavLink();
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === Active Nav Link ===
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // === Mobile Menu ===
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // === Hero Slider ===
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dotsContainer.children[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dotsContainer.children[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6000);
    }

    slideInterval = setInterval(nextSlide, 6000);

    // === Portfolio Filter ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = '';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // === Testimonials Slider ===
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    const testimonialPrev = document.querySelector('.testimonial-btn.prev');
    const testimonialNext = document.querySelector('.testimonial-btn.next');
    let currentTestimonial = 0;

    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        testimonialDotsContainer.appendChild(dot);
    });

    function goToTestimonial(index) {
        testimonialCards[currentTestimonial].classList.remove('active');
        testimonialDotsContainer.children[currentTestimonial].classList.remove('active');
        currentTestimonial = index;
        testimonialCards[currentTestimonial].classList.add('active');
        testimonialDotsContainer.children[currentTestimonial].classList.add('active');
    }

    if (testimonialPrev) {
        testimonialPrev.addEventListener('click', () => {
            goToTestimonial((currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length);
        });
    }

    if (testimonialNext) {
        testimonialNext.addEventListener('click', () => {
            goToTestimonial((currentTestimonial + 1) % testimonialCards.length);
        });
    }

    // Auto-rotate testimonials
    setInterval(() => {
        goToTestimonial((currentTestimonial + 1) % testimonialCards.length);
    }, 8000);

    // === Counter Animation ===
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;

    function animateCounters() {
        statNumbers.forEach(num => {
            const target = parseInt(num.dataset.target);
            const increment = target / 60;
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    num.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    num.textContent = target;
                }
            };
            updateCounter();
        });
    }

    // === Scroll Reveal ===
    const revealElements = document.querySelectorAll(
        '.section-label, .section-title, .section-desc, .about-grid, .service-card, .portfolio-item, ' +
        '.philosophy-content, .philosophy-image, .process-step, .award-card, .contact-info, .contact-form-wrapper'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Trigger counter animation
                if (entry.target.closest('.about') && !statsCounted) {
                    statsCounted = true;
                    animateCounters();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Contact Form ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent!';
                submitBtn.style.background = '#2d7d46';

                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }

    // === Parallax-like effect on scroll (subtle) ===
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            const scrollY = window.scrollY;
            if (heroContent && scrollY < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
            }
        }
    });

    // === Stagger animation for service cards ===
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, i * 100);
            }
        });
    }, { threshold: 0.2 });

    serviceCards.forEach(card => serviceObserver.observe(card));
});
