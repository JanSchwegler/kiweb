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
    slide.addEventListener('touchstart', scrubbingDisc);
    slide.addEventListener('mousedown', scrubbingDisc);
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
let scrubber = slides[currentIndex], // current vinyl
    scrubbing = false // bool to tell if currently scrubbing
    initialScrubberAngle = 0, // initial angle of div / reset at audio change
    scrubbMove = 0, // Used to track every movment and calc the current offset / reset at scrubb start to initial mouse angle
    scrubbAngle = 0, // current scrubb movement in the allowed range / reset at scrubb start
    maxSrubberAngle = 0; // reset at audio change
    centerX = scrubber.offsetLeft + scrubber.offsetWidth / 2,
    centerY = scrubber.offsetTop + scrubber.offsetHeight / 2;

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

function scrubbingDisc(event) {
    event.preventDefault();
    // Reset
    scrubbing = true;
    scrubbAngle = 0;
    wasPlaying = !audio.paused && !audio.ended;
    // initialScrubberAngle
    let transformValue = scrubber.style.transform;
    if (transformValue && transformValue !== 'none') {
      transformValue = transformValue.match(/rotate\(([-\d.]+)deg\)/);
      if (transformValue && transformValue.length > 1) {
        initialScrubberAngle = parseFloat(transformValue[1]);
      }
    }
    if (event.type === 'touchstart') {
        let touch = event.touches[0];
        scrubbMove = ((Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * 180 / Math.PI + 90) + 360) % 360;
        document.addEventListener('touchmove', rotate);
        document.addEventListener('touchend', () => {
            document.removeEventListener('touchmove', rotate);
            scrubbing = false;
            if (!wasPlaying) {
                audio.pause();
            }
        });
    } else {
        scrubbMove = ((Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180 / Math.PI + 90) + 360) % 360;
        document.addEventListener('mousemove', rotate);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', rotate);
            scrubbing = false;
            if (!wasPlaying) {
                audio.pause();
            }
        });
    }
}
function rotate(event) {
    let mouseAngle;
    if (event.type === 'touchmove') {
        let touch = event.touches[0];
        mouseAngle = ((Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * 180 / Math.PI + 90) + 360) % 360;
    } else {
        mouseAngle = ((Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180 / Math.PI + 90) + 360) % 360;
    }
    let angleDiffrence;
    if (mouseAngle - scrubbMove < -180) {
        scrubbMove -= 360;
    } else if (mouseAngle - scrubbMove > 180) {
        scrubbMove += 360;
    }
    angleDiffrence = mouseAngle - scrubbMove;
    scrubbMove += angleDiffrence;
    // check limits
    if (scrubbAngle + angleDiffrence + initialScrubberAngle > 0 && scrubbAngle + angleDiffrence + initialScrubberAngle < maxSrubberAngle) {
        scrubbAngle += angleDiffrence;
    }
    scrubber.style.transform = `rotate(${scrubbAngle + initialScrubberAngle}deg)`;
    audio.currentTime = (scrubbAngle + initialScrubberAngle) / 360 * secondsPerRotate;
}


// rotation rest animation ---------------------------------------------------------------------------------------------------
function animateRotation(e) {
    let start = performance.now();

    let transformValue = window.getComputedStyle(e).getPropertyValue('transform');
    let angle;
    if (transformValue != "none") {
        let matrix = transformValue.match(/^matrix\((.*)\)$/)[1].split(', ');
        angle = Math.round(Math.atan2(matrix[1], matrix[0]) * (180 / Math.PI));
    } else {
        angle = 360;
    }
    let startRotation = angle > 0 ? angle : angle + 360;

    let duration = (startRotation - 500) * -4;
    let endRotation = 360;
    function animate(currentTime) {
        let elapsed = currentTime - start;
        let progress = Math.min(elapsed / duration, 1); 
        let interpolatedRotation = easeOut(progress) * (endRotation - startRotation) + startRotation;
        e.style.transform = `rotate(${interpolatedRotation}deg)`;
        if (elapsed < duration) {
            requestAnimationFrame(animate);
        } else {
            e.style.transform = "rotate(0deg)";
        }
    }
    requestAnimationFrame(animate);
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
        audio.removeEventListener('ended', audioEnded);
    }
    audio = newAudio;
    audio.addEventListener('play', audioPlay);
    audio.addEventListener('ended', audioEnded);
    lastRotationAngle = 0;
    rotationStep = 0;
    audio.addEventListener('loadedmetadata', function() {
        maxSrubberAngle = (360 / secondsPerRotate) * audio.duration;
        console.log(maxSrubberAngle);
    });
}

function updateScrubber() {
    scrubber.style.transform = `rotate(${(360 / secondsPerRotate) * audio.currentTime}deg)`;
    // keep animating if audio is playing
    if (!audio.paused && !audio.ended) {
        requestAnimationFrame(updateScrubber);
    }
}

function audioPlay() {
    requestAnimationFrame(updateScrubber);
}

function audioEnded() {
    animateRotation(slides[currentIndex]); // can be removed if transition is added sucessfully
    initialAudio(audio);
    // TODO: restart / start next song
}