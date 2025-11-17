// script.js (dentro da pasta bemvindo)

document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.getElementById('welcomeSection');
    // Removemos a referência a visualEffect, já que ele não será mais usado da mesma forma.

    if (!welcomeSection) return;

    // --- Efeito de Animação de Entrada (Intersection Observer) ---
    // Agora o observador vai animar o card e depois o conteúdo
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // A seção precisa estar 10% visível para o card aparecer
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(welcomeSection);

    // O efeito de Parallax com mouse move foi removido,
    // pois o gradiente de fundo animado já cria um "UAU!" visual.
    // Se quiser reintroduzir um parallax, precisaríamos de um elemento diferente.
});