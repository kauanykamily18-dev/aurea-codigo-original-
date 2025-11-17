const slides = document.querySelectorAll('.banner-slide');
const wrapper = document.querySelector('.banner-wrapper');

let index = 0;
let startX = 0;
let isDragging = false;
let currentTranslate = 0;
let previousTranslate = 0;
let animationID = 0;

// Atualiza a imagem
function updateSlide() {
    wrapper.style.transform = `translateX(${-index * 100}%)`;
}

// Botões
document.querySelector('.next-btn').onclick = () => {
    index = (index + 1) % slides.length;
    updateSlide();
};

document.querySelector('.prev-btn').onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
};

// -----------------------------
// ARRASTAR COM MOUSE E TOUCH
// -----------------------------

slides.forEach((slide, i) => {
    // Previne arrastar a imagem por padrão
    slide.addEventListener("dragstart", e => e.preventDefault());

    // Mouse
    slide.addEventListener("mousedown", dragStart);
    slide.addEventListener("mouseup", dragEnd);
    slide.addEventListener("mouseleave", dragEnd);
    slide.addEventListener("mousemove", dragMove);

    // Touch
    slide.addEventListener("touchstart", dragStart);
    slide.addEventListener("touchend", dragEnd);
    slide.addEventListener("touchmove", dragMove);
});

function dragStart(e) {
    isDragging = true;
    startX = getPositionX(e);
    wrapper.style.transition = "none";

    animationID = requestAnimationFrame(animation);
}

function dragMove(e) {
    if (!isDragging) return;

    const currentPosition = getPositionX(e);
    currentTranslate = previousTranslate + currentPosition - startX;
}

function dragEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;

    const movedBy = currentTranslate - previousTranslate;

    // Se arrastou mais de 100px → troca slide
    if (movedBy < -100 && index < slides.length - 1) {
        index++;
    }
    if (movedBy > 100 && index > 0) {
        index--;
    }

    setPositionByIndex();
}

function getPositionX(e) {
    return e.type.includes("touch")
        ? e.touches[0].clientX
        : e.clientX;
}

function animation() {
    wrapper.style.transform = `translateX(${currentTranslate}px)`;
    if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
    currentTranslate = index * -window.innerWidth;
    previousTranslate = currentTranslate;
    wrapper.style.transition = "0.5s ease";
    wrapper.style.transform = `translateX(${currentTranslate}px)`;
}
