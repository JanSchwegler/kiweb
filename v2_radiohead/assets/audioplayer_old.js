// Window resize ---------------------------------------------------------------------------------------------------------
window.addEventListener('resize', () => {
    setPositionByIndex();
    updateScrubberCenter();
});

// Slider ---------------------------------------------------------------------------------------------------------------
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

    // Listeners for scrubbing
    slide.addEventListener('touchstart', scrubberTouchstart);
    slide.addEventListener('touchmove', scrubberTouchmove);
    slide.addEventListener('touchend', scrubberTouchend);
    slide.addEventListener('mousedown', scrubberMousedown);
});

function touchStart(index) {
    return function (event) {
        if(currentIndex != index) {
            scrubberResetRotation(currentIndex).then((e) => {
                animateRotation(slides[e]);
                updateScrubberCenter();
            });
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
        animateRotation(slides[currentIndex]);
        currentIndex -= 1;
        setPositionByIndex();
        updateScrubberCenter();
}

document.getElementById('audioplayer-arrow-right').onclick = function() {
    if (currentIndex < slides.length - 1)
        animateRotation(slides[currentIndex]);
        currentIndex += 1
        setPositionByIndex();
        updateScrubberCenter();
}

// vinyl rotate ---------------------------------------------------------------------------------------------------------
let scrubber = slides[currentIndex],
    initialTouchAngle = 0,
    initialElementAngle = 0,
    initialAudioTime = 0,
    centerX = scrubber.offsetLeft + scrubber.offsetWidth / 2,
    centerY = scrubber.offsetTop + scrubber.offsetHeight / 2,
    dragging = false;

    
async function scrubberResetRotation(e) {
    return new Promise(resolve => {
        let releaseHandler = () => {
            resolve(e);
            window.removeEventListener('mouseup', releaseHandler);
            window.removeEventListener('touchend', releaseHandler);
        };
        window.addEventListener('mouseup', releaseHandler);
        window.addEventListener('touchend', releaseHandler);
    });
}

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

function scrubberTouchstart(event) {
    event.preventDefault();
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
    updateScrubberCenter();
}

function scrubberMousedown(event) {
    event.preventDefault();
    dragging = true;
    wasPlaying = !audio.paused && !audio.ended;
    initialTouchAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    initialAudioTime = audio.currentTime;
    initialElementAngle = getCurrentRotation(scrubber);
    if (audio.paused || audio.ended) {
        //audio.play();
    }
}

document.addEventListener('mousemove', function(event) {
    if (dragging) {
        let currentTouchAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
        let angleDiff = (currentTouchAngle - initialTouchAngle) * (180 / Math.PI);
        let newRotation = (angleDiff) + initialElementAngle;
        scrubber.style.transform = 'rotate(' + newRotation + 'deg)';
        
        //console.log(angleDiff / 360 * secondsPerRotate);
        let audioChange = angleDiff / 360 * secondsPerRotate;
        console.log(audioChange);
        if (initialAudioTime + audioChange >= audio.duration) {
            //audio.currentTime = (audio.duration - 1);
        } else {
            //audio.currentTime = initialAudioTime + audioChange;
        }
    }
});

document.addEventListener('mouseup', function() {
    dragging = false;
    if (!wasPlaying) {
        audio.pause();
    }
    updateScrubberCenter();
});

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
    return 360;
}

// rotation rest animation ---------------------------------------------------------------------------------------------------
function animateRotation(e) {
    let start = performance.now();
    let startRotation = getCurrentRotation(e);
    let duration = (startRotation - 500) * -4;
    let endRotation = 360;
    function animate(currentTime) {
        let elapsed = currentTime - start;
        let progress = Math.min(elapsed / duration, 1); 
        let interpolatedRotation = easeOut(progress) * (endRotation - startRotation) + startRotation;
        e.style.transform = `rotate(${interpolatedRotation}deg)`;
        if (elapsed < duration) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

function getCurrentRotation(e) {
    let transformValue = window.getComputedStyle(e).getPropertyValue('transform');
    let angle;
    if (transformValue != "none") {
        let matrix = transformValue.match(/^matrix\((.*)\)$/)[1].split(', ');
        angle = Math.round(Math.atan2(matrix[1], matrix[0]) * (180 / Math.PI));
    } else {
        angle = 360;
    }
    return angle > 0 ? angle : angle + 360;
}

function easeOut(t) {
    return 1 - Math.pow(1 - t, 2);
}

// audio play

// let audios = Get all audio elements;
let audio, 
    secondsPerRotate = 10,
    scrubberUpdateAnimationID,
    lastRotationAngle = 0,
    rotationStep = 0,
    isScrubbing = false,
    wasPlaying = false,
    playPauseButton = document.getElementById('playpause');

initialAudio(document.getElementById('audio'));

playPauseButton.addEventListener('click', () => {
    if (audio.paused || audio.ended) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
});

function initialAudio(newAudio) {
    if (audio != null) {
        audio.removeEventListener('play', audioPlay);
        //audio.removeEventListener('pause', audioPause);
        audio.removeEventListener('ended', audioEnded);
    }
    audio = newAudio;
    audio.addEventListener('play', audioPlay);
    //audio.addEventListener('pause', audioPause);
    audio.addEventListener('ended', audioEnded);
    lastRotationAngle = 0;
    rotationStep = 0;
}

function updateScrubber() {
    // insert an if for not dragging?
    let rotationAngle = (360 / secondsPerRotate) * (audio.currentTime % secondsPerRotate);
    let shortestPath = rotationAngle - lastRotationAngle;
    if (Math.abs(shortestPath) > 180) {
        shortestPath += shortestPath > 0 ? -360 : 360;
    }
    rotationStep = shortestPath / 10;
    lastRotationAngle += rotationStep;
    scrubber.style.transform = `rotate(${lastRotationAngle}deg)`;
    // keep animating if audio is playing
    if (!audio.paused && !audio.ended) {
        requestAnimationFrame(updateScrubber);
    }
}

function audioPlay() {
    requestAnimationFrame(updateScrubber);
}

function audioPause() {
    //cancelAnimationFrame(scrubberUpdateAnimationID);
}

function audioEnded() {
    console.log("test");
    //cancelAnimationFrame(scrubberUpdateAnimationID);
    animateRotation(slides[currentIndex]); // can be removed if transition is added sucessfully
    initialAudio(audio);
    // TODO: restart / start next song
}






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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const progress = (angle + Math.PI) / (2 * Math.PI); // Calculate progress between 0 and 1
    // audio.currentTime = progress * audio.duration; // Set audio current time
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Update scrubber position
audio.addEventListener('timeupdate', () => {
    // TODO change scrubber position calculation
    const progress = audio.currentTime / audio.duration;
    scrubber.style.transform = `rotate(${progress * (2 * Math.PI)}rad)`;
}); */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////