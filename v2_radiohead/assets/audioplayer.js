// Window resize ---------------------------------------------------------------------------------------------------------
window.addEventListener('resize', () => {
    setPositionByIndex();
    updateScrubberCenter();
});

// open and close the player ---------------------------------------------------------------------------------------------
function openPlayer(event) {
    event.preventDefault();
    let clickStartPosition = [], clickEndPosition = [];
    if (event.type === 'touchstart') {
        let touch = event.touches[0];
        clickStartPosition = [touch.clientX, touch.clientY];
        document.addEventListener('touchend', clickEnd);
    } else {
        clickStartPosition = [event.clientX, event.clientY];
        document.addEventListener('mouseup', clickEnd);
    }
    function clickEnd (event) {
        if (event.type === 'touchend') {
            let touch = event.changedTouches[0];
            clickEndPosition = [touch.clientX, touch.clientY];
            document.removeEventListener('touchend', clickEnd);
        } else {
            clickEndPosition = [event.clientX, event.clientY];
            document.removeEventListener('mouseup', clickEnd);
        }
        if (Math.abs(clickStartPosition[0] - clickEndPosition[0]) <= 2 && Math.abs(clickStartPosition[1] - clickEndPosition[1]) <= 2) {
            if (audioplayer.classList.contains('audioplayer-close')) {
                audioplayer.classList.remove('audioplayer-close');
            } else {
                audioplayer.classList.add('audioplayer-close');
            }
        }
    }
}

// mouse hover text -----------------------------------------------------------------------------------------------------
let hoverTextElement = document.getElementById("hoverText");
let hoverTextAudioPLayed = false;
let hideTextTimeout = null;
let hotfixStopClear = false;
function hoverText (event) {
    hotfixStopClear = true;
    if (audioplayer.classList.contains('audioplayer-close')) {
        hoverTextElement.innerHTML = "open";
    } else {
        if (hoverTextAudioPLayed) {
            hoverTextElement.innerHTML = "scrubb me!";
        } else {
            hoverTextElement.innerHTML = "play";
        }
    }
    updatePosition(event);
    hoverTextElement.style.display = "block";
    hoverTextElement.style.opacity = "1";
    document.addEventListener('mousemove', updatePosition);
    event.target.addEventListener('mouseleave', () => {
        hoverTextElement.style.opacity = "0";
        hotfixStopClear = false;
        hideTextTimeout = setTimeout(function() {
            if (!hotfixStopClear) {
                document.removeEventListener('mousemove', updatePosition);
                hoverTextElement.style.display = "none";
            }
        }, 300);
    });

    function updatePosition (event) {
        let x = event.clientX;
        let y = event.clientY;
        hoverTextElement.style.left = x + "px";
        hoverTextElement.style.top = y + 30 + "px";
    }
}

// Slider ---------------------------------------------------------------------------------------------------------------
let slider = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'))

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0;

// add listener for mouse hover text
slides[currentIndex].addEventListener('mouseenter', hoverText)

slides.forEach((slide, index) => {
    // Touch events slide
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)

    // Mouse events slide
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)

    // Listeners for scrubbing
    slide.addEventListener('touchstart', scrubbingDisc);
    slide.addEventListener('mousedown', scrubbingDisc);

    // open and close player
    slide.addEventListener('touchstart', openPlayer);
    slide.addEventListener('mousedown', openPlayer);
});

function touchStart(index) {
    return function (event) {
        if(currentIndex != index) {
            // Whait for no more touches -> then
            scrubberResetRotation(currentIndex).then((e) => {
                initialAudio();
                animateRotation(slides[e]);
                updateScrubberCenter();
                // remove and add eventlistner from old slide
                slides[e].removeEventListener('mouseenter', hoverText) // remove listener from old slide
                slides[index].addEventListener('mouseenter', hoverText) // add listener to new slide
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
        slides[currentIndex].removeEventListener('mouseenter', hoverText) // remove listener from old slide
        currentIndex -= 1;
        setPositionByIndex();
        updateScrubberCenter();
        initialAudio();
        slides[currentIndex].addEventListener('mouseenter', hoverText) // add listener to new slide
}

document.getElementById('audioplayer-arrow-right').onclick = function() {
    if (currentIndex < slides.length - 1)
        animateRotation(slides[currentIndex]);
        slides[currentIndex].removeEventListener('mouseenter', hoverText) // remove listener from old slide
        currentIndex += 1
        setPositionByIndex();
        updateScrubberCenter();
        initialAudio();
        slides[currentIndex].addEventListener('mouseenter', hoverText) // add listener to new slide
}

// vinyl rotate ---------------------------------------------------------------------------------------------------------
let scrubber = slides[currentIndex], // current vinyl
    scrubberBackground = document.getElementById("slide-background"), // del?
    scrubbing = false, // bool to tell if currently scrubbing
    initialScrubberAngle = 0, // initial angle of div / reset at audio change
    scrubbMove = 0, // Used to track every movment and calc the current offset / reset at scrubb start to initial mouse angle
    scrubbAngle = 0, // current scrubb movement in the allowed range / reset at scrubb start
    maxSrubberAngle = 0, // reset at audio change
    movementTimer; // used to detect if there is no movement but a click
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
    // Backup get maxSrubberAngle
    if (maxSrubberAngle < 2) {
        maxSrubberAngle = (360 / secondsPerRotate) * audio.duration;
    }
    // Reset
    hoverTextAudioPLayed = true;
    scrubbing = true;
    scrubbAngle = 0;
    wasPlaying = !audio.paused && !audio.ended;
    audio.pause();
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
            clearTimeout(movementTimer);
            scrubbing = false;
            audio.play();
        });
    } else {
        scrubbMove = ((Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180 / Math.PI + 90) + 360) % 360;
        document.addEventListener('mousemove', rotate);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', rotate);
            clearTimeout(movementTimer);
            scrubbing = false;
            audio.play();
        });
    }
}
function rotate(event) {
    // start playing on scrubb
    if (audio.paused || audio.ended) {
        audio.play();
    }
    clearTimeout(movementTimer);
    // calc scrubb move
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
    // set timer to check moves
    movementTimer = setTimeout(function() {
        audio.pause();
    }, 10);
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

// audio play ---------------------------------------------------------------------------------------------------

let audios = Array.from(document.querySelectorAll('.slide audio'))
let audio, 
    secondsPerRotate = 10,
    scrubberUpdateAnimationID,
    wasPlaying = false;
initialAudio();
// Triggr play and pause
/*
playPauseButton.addEventListener('click', () => {
    if (audio.paused || audio.ended) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
});*/

function initialAudio() {
    let wasPlaying = false;
    if (audio != null) {
        wasPlaying = !audio.paused && !audio.ended;
        audio.removeEventListener('play', audioPlay);
        audio.removeEventListener('ended', audioEnded);
        audio.pause();
        audio.currentTime = 0;
    }
    audio = audios[currentIndex];
    audio.addEventListener('play', audioPlay);
    audio.addEventListener('ended', audioEnded);
    audio.addEventListener('loadedmetadata', function() {
        maxSrubberAngle = (360 / secondsPerRotate) * audio.duration;
    });
    wasPlaying ? audio.play() : null;
}
// updateScrubber with animation called from audioPlay
function updateScrubber() {
    scrubber.style.transform = `rotate(${(360 / secondsPerRotate) * audio.currentTime}deg)`;
    if (!audio.paused && !audio.ended) {
        requestAnimationFrame(updateScrubber);
    }
}

function audioPlay() {
    requestAnimationFrame(updateScrubber);
}

function audioEnded() {
    animateRotation(slides[currentIndex]); // can be removed if transition is added sucessfully
    initialAudio();
    // start next song / if last -> go to first
    if (currentIndex < slides.length - 1) {
        animateRotation(slides[currentIndex]);
        currentIndex += 1;
        setPositionByIndex();
        updateScrubberCenter();
        initialAudio();
    } else {
        animateRotation(slides[currentIndex]);
        currentIndex = 0;
        setPositionByIndex();
        updateScrubberCenter();
        initialAudio();
    }
}

// TODO: 
// Rotate background on scrubbing and play animation. NOT the reset to 0 deg