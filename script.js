document.addEventListener('DOMContentLoaded', () => {
    // 1. SCROLL SUAVE PARA LINKS DE NAVEGAÇÃO
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. LÓGICA SIMPLES PARA O FORMULÁRIO DE CONTATO (SEM BACKEND)
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form && formStatus) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simula o envio
            formStatus.classList.remove('hidden');
            formStatus.style.color = 'green';
            formStatus.textContent = 'Mensagem enviada com sucesso! Logo entrarei em contato.';

            // Oculta o status após 5 segundos
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);

            // Limpa o formulário
            form.reset();

            // NOTA: Para um formulário funcional, você precisará de um serviço de backend
            // como Formspree, Netlify Forms ou um servidor próprio.
        });
    }

    // 3. OBSERVER PARA ADICIONAR ANIMAÇÕES AO SCROLL (OPCIONAL)
    // Uma função para detectar se um elemento está na tela e adicionar uma classe de animação.
    const sections = document.querySelectorAll('.section-padding');
    const options = {
        root: null, // viewport
        threshold: 0.1, // 10% do elemento visível
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Para que a animação ocorra apenas uma vez
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Você precisaria adicionar o CSS para 'fade-in' e 'animate-on-scroll' no style.css:
    /*
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    .hidden {
        display: none;
    }
    */
});