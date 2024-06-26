// Define the audio context
let audioContext = new (window.AudioContext || window.webkitAudioContext)(),
    audioBufferSources = [], // To hold the buffer sources
    analyser = audioContext.createAnalyser(),
    audioBuffers = [], // To hold the decoded audio data
    currentIndex = 0, // Currently playing buffer index
    audioPlaying = false,
    secondsPerRotate = 5,
    scrubberUpdateAnimationID,
    audioStartTime = 0;

// Preload all audio files
let audioFiles = [
    'assets/audio/01_Creep.mp3',
    //'assets/audio/02_No Surprises.mp3',
    'assets/audio/03_Karma Police.mp3',
    'assets/audio/04_High and Dry.mp3',
    'assets/audio/05_Jigsaw Falling Into Place.mp3',
    //'assets/audio/06_Just.mp3',
    //'assets/audio/07_Fake Plastic Trees.mp3',
    'assets/audio/08_Weird Fishes Arpeggi.mp3',
    'assets/audio/09_Exit Music (For A Film).mp3'//,
    //'assets/audio/10_All I Need.mp3'
];

// slider & rotation variables
let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    slider,
    slides,
    sliderArrowLeft,
    sliderArrowRight,
    // rotation
    scrubber, // current vinyl
    scrubbing = false, // bool to tell if currently scrubbing
    initialScrubberAngle = 0, // initial angle of div / reset at audio change
    initialSlideBackgroundAngle = 0, // initial angle of background div
    scrubbMove = 0, // Used to track every movment and calc the current offset / reset at scrubb start to initial mouse angle
    scrubbAngle = 0, // current scrubb movement in the allowed range / reset at scrubb start
    maxSrubberAngle = 0, // reset at audio change
    centerX,
    centerY,
    audioCurrentTime = 0,
    currentTouch = [0, 0], // save current touch to have the last position for touchend
    slideBackground;

// functions - initialising --------------------------------------------------------------------------------
async function initialisingAudioFiles() {
    let audioDataPromises = audioFiles.map(file => fetch(file).then(response => response.arrayBuffer()));
    // Wait for all fetches to complete
    let audioData = await Promise.all(audioDataPromises);
    // Decode audio data and store in audioBuffers
    let decodePromises = audioData.map(data => audioContext.decodeAudioData(data));
    audioBuffers = await Promise.all(decodePromises);
    initialisingAudioBufferSources();
}

function initialisingAudioBufferSources () {
    // disconnect the current buffer source
    if (audioBufferSources[currentIndex]) {
        audioBufferSources[currentIndex].disconnect();
    }
    // create a new buffer source
    let source = audioContext.createBufferSource();
    source.buffer = audioBuffers[currentIndex];
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    audioBufferSources[currentIndex] = source;
    maxSrubberAngle = (360 / secondsPerRotate) * audioBuffers[currentIndex].duration;
}

function initialisingSlider () {
    slider = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'));
    slideBackground = document.getElementById('slide-background');
    sliderArrowLeft = document.getElementById('audioplayer-arrow-left');
    sliderArrowRight = document.getElementById('audioplayer-arrow-right');

    // listeners for testToMouse
    sliderArrowLeft.addEventListener("mouseleave", removeText);
    sliderArrowLeft.addEventListener('mouseenter', function(event) {
        setText(event.target);
    });
    sliderArrowRight.addEventListener("mouseleave", removeText);
    sliderArrowRight.addEventListener('mouseenter', function(event) {
        setText(event.target);
    });

    // add eventlisteners
    sliderArrowLeft.addEventListener('click', handleArrowLeft);
    sliderArrowRight.addEventListener('click', handleArrowRight);
    slides.forEach((slide, index) => {
        // listeners for slider
        slide.addEventListener('touchstart', sliderTouchStart(index));
        slide.addEventListener('mousedown', sliderTouchStart(index));
        
        slide.addEventListener('touchmove', sliderTouchMove);
        slide.addEventListener('mousemove', sliderTouchMove);

        slide.addEventListener('touchend', sliderTouchEnd);
        slide.addEventListener('mouseup', sliderTouchEnd);
        slide.addEventListener('mouseleave', sliderTouchEnd);
    
        // listeners for scrubbing
        slide.addEventListener('touchstart', scrubbingDisc);
        slide.addEventListener('mousedown', scrubbingDisc);

        // listeners for testToMouse
        slide.addEventListener("mouseleave", removeText);
        slide.addEventListener('mouseenter', function(event) {
            setText(event.target, index);
        });
    });
    // rotation
    scrubber = slides[currentIndex];
    centerX = scrubber.offsetLeft + scrubber.offsetWidth / 2;
    centerY = scrubber.offsetTop + scrubber.offsetHeight / 2;
}

// functions - handle general data --------------------------------------------------------------------------------
function updateCurrentIndex(index, oldIndex) {
    currentIndex = index;
    scrubber = slides[currentIndex];
    resetRotation(slides[oldIndex]);
    // if playing -> stop and play audio
    if (audioPlaying) {
        stopBuffer(oldIndex);
        playBuffer();
    }
}

// functions - handle audio play --------------------------------------------------------------------------------
function playBuffer (startTime = 0) {
    audioPlaying = true;
    initialisingAudioBufferSources();
    audioBufferSources[currentIndex].start(0, startTime);
    audioStartTime = audioContext.currentTime - startTime;
    requestAnimationFrame(updateScrubber);
}

function stopBuffer(index = currentIndex) {
    if (audioBufferSources[index] && audioPlaying) {
        audioBufferSources[index].stop();
        audioPlaying = false;
    }
}

// functions - handle slider --------------------------------------------------------------------------------
function sliderTouchStart(index) {
    return function (event) {
        if (currentIndex != index) {
            updateCurrentIndex(index, currentIndex);
            startPos = getPositionX(event)
            isDragging = true
            animationID = requestAnimationFrame(animation)
        }
    }
}
function sliderTouchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    setPositionByIndex();
}
function sliderTouchMove (event) {
    if (isDragging) {
        let currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}
function getPositionX (event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}
function animation () {
    setSliderPosition();
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}
function setSliderPosition () {
    slider.style.transform = `translateX(${currentTranslate}px)`;
    updateScrubberCenter();
}
function setPositionByIndex () {
    currentTranslate = currentIndex * -(window.innerWidth * 0.5);
    prevTranslate = currentTranslate;
    setSliderPosition();
    if (currentIndex > 0) {
        sliderArrowLeft.classList.remove('hidden');
    } else {
        sliderArrowLeft.classList.add('hidden');
    }
    if (currentIndex < slides.length - 1) {
        sliderArrowRight.classList.remove('hidden');
    } else {
        sliderArrowRight.classList.add('hidden');
    }
}
function handleArrowLeft () {
    if (currentIndex > 0) {
        updateCurrentIndex(currentIndex - 1, currentIndex);
        setPositionByIndex();
    }
}
function handleArrowRight () {
    if (currentIndex < slides.length - 1) {
        updateCurrentIndex(currentIndex + 1, currentIndex);
        setPositionByIndex();
    }
}

// functions - handle rotation --------------------------------------------------------------------------------
async function waitForNoTouches(e) {
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
    let sliderTranslate;
    if (slider.style.transform) {
        sliderTranslate = parseFloat(slider.style.transform.match(/-?\d+\.?\d*/)[0]);
    } else {
        sliderTranslate = 0;
    }
    centerX = (scrubber.offsetLeft + sliderTranslate) + (scrubber.offsetWidth / 2);
    centerY = slider.getBoundingClientRect().top + 50 + scrubber.offsetHeight / 2;
}

function scrubbingDisc(event) {
    updateScrubberCenter();
    event.preventDefault();
    // backup get maxSrubberAngle
    if (maxSrubberAngle < 2 && audioBuffers[currentIndex]) {
        maxSrubberAngle = (360 / secondsPerRotate) * audioBuffers[currentIndex].duration;
    }
    // reset
    scrubbing = true;
    scrubbAngle = 0;
    // change text if audio wasnt playing
    if (!audioPlaying) {
        hoverTextElement.innerHTML = "scrubb me";
    }
    // stop audio
    stopBuffer();
    // initialScrubberAngle
    let transformValue = scrubber.style.transform;
    if (transformValue && transformValue !== 'none') {
      transformValue = transformValue.match(/rotate\(([-\d.]+)deg\)/);
      if (transformValue && transformValue.length > 1) {
        initialScrubberAngle = parseFloat(transformValue[1]);
      }
    }
    // initialSlideBackgroundAngle
    let transformValueSlideBackground = slideBackground.style.transform;
    if (transformValueSlideBackground && transformValueSlideBackground !== 'none') {
        transformValueSlideBackground = transformValueSlideBackground.match(/rotate\(([-\d.]+)deg\)/);
      if (transformValueSlideBackground && transformValueSlideBackground.length > 1) {
        initialSlideBackgroundAngle = parseFloat(transformValueSlideBackground[1]);
      }
    }
    if (event.type === 'touchstart') {
        let touch = event.touches[0];
        let clickStartPosition = [touch.clientX, touch.clientY];
        currentTouch = clickStartPosition;
        scrubbMove = ((Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * 180 / Math.PI + 90) + 360) % 360;
        slides[currentIndex].addEventListener('touchmove', rotate);
        slides[currentIndex].addEventListener('touchend', (event) => {
            slides[currentIndex].removeEventListener('touchmove', rotate);
            scrubbing = false;
            if (clickStartPosition[0] == currentTouch && clickStartPosition[1] == currentTouch) {
                playBuffer(initialScrubberAngle / 360 * secondsPerRotate);
            } else {
                playBuffer(audioCurrentTime);
            }
        });
    } else {
        let clickStartPosition = [event.clientX, event.clientY];
        scrubbMove = ((Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180 / Math.PI + 90) + 360) % 360;
        slides[currentIndex].addEventListener('mousemove', rotate);
        slides[currentIndex].addEventListener('mouseup', (event) => {
            slides[currentIndex].removeEventListener('mousemove', rotate);
            scrubbing = false;
            if (clickStartPosition[0] == event.clientX && clickStartPosition[1] == event.clientY) {
                playBuffer(initialScrubberAngle / 360 * secondsPerRotate);
            } else {
                playBuffer(audioCurrentTime);
            }
        });
    }
}

function rotate(event) {
    // calc scrubb move
    let mouseAngle;
    let angleDiffrence;
    if (event.type === 'touchmove') {
        let touch = event.touches[0];
        currentTouch = [touch.clientX, touch.clientY];
        mouseAngle = ((Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * 180 / Math.PI + 90) + 360) % 360;
    } else {
        mouseAngle = ((Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180 / Math.PI + 90) + 360) % 360;
    }
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
    // rotate scrubber
    scrubber.style.transform = `rotate(${scrubbAngle + initialScrubberAngle}deg)`;
    slideBackground.style.transform = `rotate(${scrubbAngle + initialSlideBackgroundAngle}deg)`;
    // play audio
    initialisingAudioBufferSources();
    audioCurrentTime = (scrubbAngle + initialScrubberAngle) / 360 * secondsPerRotate;
    let duration = 0.1;
    audioBufferSources[currentIndex].start(0, audioCurrentTime, duration);
}

// rotation reset animation
function resetRotation(e) {
    let start = performance.now();
    let transformValue = window.getComputedStyle(e).getPropertyValue('transform');
    let angle;
    if (transformValue != "none") {
        let matrix = transformValue.match(/^matrix\((.*)\)$/)[1].split(', ');
        angle = Math.round(Math.atan2(matrix[1], matrix[0]) * (180 / Math.PI));
    } else {
        angle = 0;
    }
    let startRotation = angle >= 0 ? angle : angle + 360;
    let duration = (startRotation + 200) * 3;
    let endRotation = 0;
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

function updateScrubber() {
    let currentTime = audioContext.currentTime - audioStartTime;
    // Rotate Backgorund
    let currentScrubberAngle = scrubber.style.transform;
    if (currentScrubberAngle && currentScrubberAngle !== 'none') {
        currentScrubberAngle = currentScrubberAngle.match(/rotate\(([-\d.]+)deg\)/);
      if (currentScrubberAngle && currentScrubberAngle.length > 1) {
        currentScrubberAngle = parseFloat(currentScrubberAngle[1]);
      }
    }
    let currentBackgroundAngle = slideBackground.style.transform;
    if (currentBackgroundAngle && currentBackgroundAngle !== 'none') {
        currentBackgroundAngle = currentBackgroundAngle.match(/rotate\(([-\d.]+)deg\)/);
      if (currentBackgroundAngle && currentBackgroundAngle.length > 1) {
        currentBackgroundAngle = parseFloat(currentBackgroundAngle[1]);
      }
    }
    slideBackground.style.transform = `rotate(${currentBackgroundAngle + ((360 / secondsPerRotate) * currentTime) - currentScrubberAngle}deg)`;

    // Rotate Scrubber
    scrubber.style.transform = `rotate(${(360 / secondsPerRotate) * currentTime}deg)`;
    if (!scrubbing && currentTime < audioBuffers[currentIndex].duration) {
        requestAnimationFrame(updateScrubber);
    } else if (!scrubbing) {
        if (currentIndex < slides.length - 1) {
            updateCurrentIndex(currentIndex + 1, currentIndex);
            setPositionByIndex();
        } else {
            updateCurrentIndex(0, currentIndex);
            setPositionByIndex();
        }
    }
}