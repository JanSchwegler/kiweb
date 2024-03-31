let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    slider,
    slides,
    sliderArrowLeft,
    sliderArrowRight;

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", function() {
    initialisingSlider();
});

function initialisingSlider () {
    slider = document.querySelector('.slider-container');
    slides = Array.from(document.querySelectorAll('.slide'));
    sliderArrowLeft = document.getElementById('audioplayer-arrow-left');
    sliderArrowRight = document.getElementById('audioplayer-arrow-right');

    // add eventlisteners
    sliderArrowLeft.addEventListener('click', handleArrowLeft);
    sliderArrowRight.addEventListener('click', handleArrowRight);
    slides.forEach((slide, index) => {
        // Touch events
        slide.addEventListener('touchstart', touchStart(index))
        slide.addEventListener('touchend', touchEnd)
        slide.addEventListener('touchmove', touchMove)
    
        // Mouse events
        slide.addEventListener('mousedown', touchStart(index))
        slide.addEventListener('mouseup', touchEnd)
        slide.addEventListener('mouseleave', touchEnd)
        slide.addEventListener('mousemove', touchMove)
    });
}

function updateCurrentIndex(index, oldIndex) {
    currentIndex = index;
    console.log(currentIndex);
    // if playing -> stop and play audio
    /*
    if (audioPlaying) {
        audioBufferSources[oldIndex].stop();
        playBuffer(currentIndex);
    }*/
    // call more functions on index change:
    // - reset rotation on old slide
    // - update center
}

function touchStart(index) {
    return function (event) {
        if (currentIndex != index) {
            updateCurrentIndex(index, currentIndex);
            startPos = getPositionX(event)
            isDragging = true
            animationID = requestAnimationFrame(animation)
        }
    }
}

function touchEnd() {
    isDragging = false
    cancelAnimationFrame(animationID)
    setPositionByIndex()
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event)
        currentTranslate = prevTranslate + currentPosition - startPos
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function animation() {
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -(window.innerWidth * 0.5)
    prevTranslate = currentTranslate
    setSliderPosition()

    if (currentIndex > 0)
        sliderArrowLeft.classList.remove('hidden')
    else
        sliderArrowLeft.classList.add('hidden')

    if (currentIndex < slides.length - 1)
        sliderArrowRight.classList.remove('hidden')
    else
        sliderArrowRight.classList.add('hidden')
}

function handleArrowLeft () {
    if (currentIndex > 0) {
        updateCurrentIndex(currentIndex - 1, currentIndex);
        setPositionByIndex()
    }
}

function handleArrowRight () {
    if (currentIndex < slides.length - 1) {
        updateCurrentIndex(currentIndex + 1, currentIndex);
        setPositionByIndex()
    }
}