// Window resize
window.addEventListener('resize', () => {
    setPositionByIndex();
    updateScrubberCenter();
});


// Slider
let slider = document.querySelector('.slider-container'),
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
        if(currentIndex != index) {
            console.log("now" + index);
            // call async function for the animation to rotate to 0
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            currentIndex = index;
            console.log(currentIndex);
            updateScrubberElement();
        }
        currentIndex = index
        startPos = getPositionX(event)
        isDragging = true
        animationID = requestAnimationFrame(animation)
    }
}

function touchEnd() {
    isDragging = false
    cancelAnimationFrame(animationID)
    updateScrubberElement();
    /*
    let movedBy = currentTranslate - prevTranslate
    if (movedBy < -(window.innerWidth * 0.5) && currentIndex < slides.length - 1) {
        currentIndex += 1;
        updateScrubberElement();
        //console.log("now" + currentIndex);
    }
    if (movedBy > (window.innerWidth * 0.5) && currentIndex > 0) {
        currentIndex -= 1;
        updateScrubberElement();
        //console.log("now" + currentIndex);
    }*/
        
    setPositionByIndex()
}

function touchMove(event) {
    if (isDragging) {
        let currentPosition = getPositionX(event)
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

// Audio player ---------------------------------------------------------------------------------------------------------
let scrubber = slides[currentIndex],
    initialTouchAngle = 0,
    initialElementAngle = 0,
    centerX = scrubber.offsetLeft + scrubber.offsetWidth / 2,
    centerY = scrubber.offsetTop + scrubber.offsetHeight / 2,
    dragging = false;
    

function updateScrubberCenter() {
    slides = Array.from(document.querySelectorAll('.slide'));
    scrubber = slides[currentIndex];
    let sliderTranslate;
    if(slider.style.transform) {
        sliderTranslate = parseFloat(slider.style.transform.match(/-?\d+\.?\d*/)[0]);
    } else {
        sliderTranslate = 0;
    }
    centerX = (scrubber.offsetLeft + sliderTranslate) + scrubber.offsetWidth / 2;
    centerY = scrubber.offsetTop + scrubber.offsetHeight / 2;
}

function updateScrubberElement() {
    //removeScrubberEventListener();
    let scrubberOld = scrubber;
    updateScrubberCenter();
    addScrubberEventListener();

    // TODO -> Add eventlisteners to all elements at the beginning

    // old
    //scrubberOld.style.transition = "0.5s ease-out";
    //scrubberOld.style.transform= "rotate(0deg)";

    // new
    //initialTouchAngle = 0;
    //initialElementAngle = 0;

    // reset
    setTimeout(function() {
        scrubberOld.style.transition = "0s";
    }, 500);
    
}

function removeScrubberEventListener() {
    scrubber.removeEventListener('touchstart', scrubberTouchstart);
    scrubber.removeEventListener('touchmove', scrubberTouchmove);
    scrubber.removeEventListener('touchend', scrubberTouchend);
    scrubber.removeEventListener('mousedown', scrubberMousedown);
}

function addScrubberEventListener() {
    scrubber.addEventListener('touchstart', scrubberTouchstart);
    scrubber.addEventListener('touchmove', scrubberTouchmove);
    scrubber.addEventListener('touchend', scrubberTouchend);
    scrubber.addEventListener('mousedown', scrubberMousedown);
}

function scrubberTouchstart(event) {
    dragging = true;
    let touch = event.touches[0];
    initialTouchAngle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
    initialElementAngle = getRotationDegrees(scrubber);
}

function scrubberTouchmove(event) {
    event.preventDefault();
    if (dragging) {
        let touch = event.touches[0];
        let currentTouchAngle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
        let angleDiff = currentTouchAngle - initialTouchAngle;
        let newRotation = (angleDiff * (180 / Math.PI)) + initialElementAngle;
        scrubber.style.transform = 'rotate(' + newRotation + 'deg)';
    }
}

function scrubberTouchend() {
    dragging = false;
}

function scrubberMousedown(event) {
    dragging = true;
    initialTouchAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    initialElementAngle = getRotationDegrees(scrubber);
}

document.addEventListener('mousemove', function(event) {
    if (dragging) {
        let currentTouchAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
        let angleDiff = currentTouchAngle - initialTouchAngle;
        let newRotation = (angleDiff * (180 / Math.PI)) + initialElementAngle;
        scrubber.style.transform = 'rotate(' + newRotation + 'deg)';
    }
});

document.addEventListener('mouseup', function() {
    dragging = false;
});

// Function to get the current rotation angle of an element
function getRotationDegrees(element) {
    let transform = window.getComputedStyle(element).getPropertyValue('transform');
    let matrix = transform.match(/^matrix\((.+)\)$/);
    if (matrix) {
        let values = matrix[1].split(',');
        let a = values[0];
        let b = values[1];
        let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        return (angle < 0) ? angle + 360 : angle;
    }
    return 0;
}
addScrubberEventListener();













;

/* OLD -------------------------------------------------------------------------------------------------------------------------------------
let audio = document.getElementById('audio'),
    audioDuration = audio.duration,
    scrubber = slides[currentIndex],
    secondsPerRotate = 5;

    //const scrubber = document.getElementById('scrubber');
    let centerX = scrubber.offsetLeft + scrubber.offsetWidth / 2;
    let centerY = scrubber.offsetTop + scrubber.offsetHeight / 2;
    let startingPoint = 0;
    let lastX = 0;
    let lastY = 0;

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

function updateCenter() {
    centerX = scrubber.offsetLeft + scrubber.offsetWidth / 2;
    centerY = scrubber.offsetTop + scrubber.offsetHeight / 2;
}

function rotateScrubber(event) {
    const deltaX = event.clientX - centerX - lastX;
    const deltaY = event.clientY - centerY - lastY;
    const angleChange = Math.atan2(deltaY, deltaX); // Calculate angle change based on mouse movement

    let angle;

    if (scrubber.style && scrubber.style.transform) {
        let currentAngle = parseFloat(scrubber.style.transform.match(/-?\d*\.?\d+/)[0]);
        angle = currentAngle + angleChange;
    } else {
        angle = angleChange;
    }

    scrubber.style.transform = `rotate(${angle}rad)`;
    const progress = (angle + Math.PI) / (2 * Math.PI); // Calculate progress between 0 and 1
    // audio.currentTime = progress * audio.duration; // Set audio current time
    
    lastX = event.clientX - centerX;
    lastY = event.clientY - centerY;
}

// Scrubb envents
scrubber.addEventListener('mousedown', (event) => {
    event.preventDefault();
    updateCenter(); // Update center position
    startingPoint = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    lastX = event.clientX - centerX;
    lastY = event.clientY - centerY;
    
    window.addEventListener('mousemove', rotateScrubber);
    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', rotateScrubber);
    });
});

// Update center position on window resize
window.addEventListener('resize', updateCenter);

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
}); */