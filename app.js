/**
 * App.js - Interactivity for Sabor de Colombia
 */

document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling for navigation links
    document.querySelectorAll('.nav-pill a').forEach(anchor => {
        // Excluiremos los enlaces que no sean a la misma página
        if (anchor.getAttribute('href').startsWith('#')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });

    // Animate recipe cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const flexObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                flexObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach((card, index) => {
        // Initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transitionDelay = `${index * 0.15}s`;
        flexObserver.observe(card);
    });

    // Alert for the interactive detail buttons
    const detailButtons = document.querySelectorAll('.view-btn');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const recipeName = e.target.parentElement.querySelector('.recipe-title').innerText;
            // Un micro-detalle: Cambiar clase CSS para añadir una animación de click
            const originalText = e.target.innerText;
            e.target.innerText = 'Cargando...';
            e.target.style.background = 'var(--colombia-yellow)';
            e.target.style.color = 'var(--bg-color)';

            setTimeout(() => {
                alert(`¡La receta interactiva para '${recipeName}' estará disponible pronto!`);
                e.target.innerTextOriginal = originalText;
                e.target.innerText = originalText;
                e.target.style.background = 'transparent';
                e.target.style.color = '';
            }, 500);
        });
    });
});
