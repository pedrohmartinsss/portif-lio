document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================
       SCROLL SUAVE
    ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(
                this.getAttribute('href')
            );
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ==========================================
       HEADER DINÂMICO
    ========================================== */
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background =
                'rgba(3,7,18,0.95)';
            header.style.borderBottom =
                '1px solid rgba(255,255,255,.1)';
        } else {
            header.style.background =
                'rgba(3,7,18,.75)';
            header.style.borderBottom =
                '1px solid rgba(255,255,255,.05)';
        }
    });

    /* ==========================================
       ANIMAÇÕES AO SCROLL
    ========================================== */
    const animatedElements = document.querySelectorAll(`
        .projeto-card,
        .skill,
        .timeline-card,
        .about-content,
        .stat
    `);
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );
    animatedElements.forEach(el => {
        el.classList.add('hidden-element');
        observer.observe(el);
    });

    /* ==========================================
       MENU ATIVO
    ========================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop =
                section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (
                link.getAttribute('href') ===
                `#${currentSection}`
            ) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       CONTADOR ANIMADO
    ========================================== */
    const counters = document.querySelectorAll('.stat h2');
    const counterObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const text = counter.textContent;
                    const targetNumber =
                        parseInt(text.replace(/\D/g, ''));
                    let current = 0;
                    const increment =
                        targetNumber / 40;
                    const updateCounter = () => {
                        current += increment;
                        if (current < targetNumber) {
                            counter.textContent =
                                Math.floor(current) + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = text;
                        }
                    };
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        },
        {
            threshold: 0.5
        }
    );
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});