// Slider
const slider = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'))

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0;

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

function touchStart(index) {
    return function (event) {
        currentIndex = index
        startPos = getPositionX(event)
        isDragging = true
    
        animationID = requestAnimationFrame(animation)
    }
}

function touchEnd() {
    isDragging = false
    cancelAnimationFrame(animationID)
  
    const movedBy = currentTranslate - prevTranslate
  
    if (movedBy < -(window.innerWidth * 0.5) && currentIndex < slides.length - 1)
        currentIndex += 1;
  
    if (movedBy > (window.innerWidth * 0.5) && currentIndex > 0)
        currentIndex -= 1;
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
        document.getElementById('audioplayer-arrow-left').classList.remove('hidden')
    else
        document.getElementById('audioplayer-arrow-left').classList.add('hidden')

    if (currentIndex < slides.length - 1)
        document.getElementById('audioplayer-arrow-right').classList.remove('hidden')
    else
        document.getElementById('audioplayer-arrow-right').classList.add('hidden')
}

document.getElementById('audioplayer-arrow-left').onclick = function() {
    if (currentIndex > 0)
        currentIndex -= 1
        setPositionByIndex()
}

document.getElementById('audioplayer-arrow-right').onclick = function() {
    if (currentIndex < slides.length - 1)
        currentIndex += 1
        setPositionByIndex()
}

// Audio player
let audio = document.getElementById('audio'),
    audioDuration = audio.duration,
    scrubber = slides[currentIndex],
    secondsPerRotate = 5;

let rect = scrubber.getBoundingClientRect(),
    centerX = rect.left + rect.width / 2,
    centerY = rect.top + rect.height / 2,
    startingpoint;

 let playPauseButton = document.getElementById('playpause');

playPauseButton.addEventListener('click', () => {
    if (audio.paused || audio.ended) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
});

function rotateScrubber(event) {
    let currentAngle = 0;

    if (scrubber.style && scrubber.style.transform) {
        currentAngle = parseFloat(scrubber.style.transform.match(/-?\d*\.?\d+/)[0]);
    }
    
    const angle = (Math.atan2(event.clientY - centerY, event.clientX - centerX) - startingpoint);

    console.log(currentAngle);
    //console.log(angle);
    //console.log(startingpoint);

    scrubber.style.transform = `rotate(${angle}rad)`;
    const progress = (angle + Math.PI) / (2 * Math.PI); // Calculate progress between 0 and 1
    audio.currentTime = progress * audio.duration; // Set audio current time
}

// Scrubb envents
scrubber.addEventListener('mousedown', (event) => {
    event.preventDefault();
    //rotateScrubber(event); //-> start scrubb on move not click
    // mouse rotation startingpoint
    startingpoint = Math.atan2(event.clientY - centerY, event.clientX - centerX);

    window.addEventListener('mousemove', rotateScrubber);
    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', rotateScrubber);
    });
});

scrubber.addEventListener('touchstart', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    rotateScrubber(touch);
    window.addEventListener('touchmove', (event) => {
        const touch = event.touches[0];
        rotateScrubber(touch);
    });
    window.addEventListener('touchend', () => {
        window.removeEventListener('touchmove', rotateScrubber(touch));
    });
});

// Update scrubber position
audio.addEventListener('timeupdate', () => {
    // TODO change scrubber position calculation
    const progress = audio.currentTime / audio.duration;
    scrubber.style.transform = `rotate(${progress * (2 * Math.PI)}rad)`;
});