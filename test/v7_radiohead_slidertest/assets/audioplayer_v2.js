// Define the audio context
let audioContext = new (window.AudioContext || window.webkitAudioContext)(),
    audioBufferSources = [], // To hold the buffer sources
    analyser = audioContext.createAnalyser(),
    audioBuffers = [], // To hold the decoded audio data
    currentIndex = 0, // Currently playing buffer index
    audioPlaying = false; 

// Preload all audio files
let audioFiles = [
    'assets/audio/01_Creep.mp3',
    'assets/audio/02_No Surprises.mp3',
    'assets/audio/03_Karma Police.mp3',
    'assets/audio/04_High and Dry.mp3',
    'assets/audio/05_Jigsaw Falling Into Place.mp3',
    'assets/audio/06_Just.mp3',
    'assets/audio/07_Fake Plastic Trees.mp3',
    'assets/audio/08_Weird Fishes Arpeggi.mp3',
    'assets/audio/09_Exit Music (For A Film).mp3',
    'assets/audio/10_All I Need.mp3'
];

// slider variables
let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    slider,
    slides,
    sliderArrowLeft,
    sliderArrowRight;

// functions - initialising --------------------------------------------------------------------------------
async function initialisingAudioFiles() {
    let audioDataPromises = audioFiles.map(file => fetch(file).then(response => response.arrayBuffer()));
    // Wait for all fetches to complete
    let audioData = await Promise.all(audioDataPromises);
    // Decode audio data and store in audioBuffers
    let decodePromises = audioData.map(data => audioContext.decodeAudioData(data));
    audioBuffers = await Promise.all(decodePromises);
    //testScubb();
}

function initialisingSlider () {
    slider = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'))
    sliderArrowLeft = document.getElementById('audioplayer-arrow-left');
    sliderArrowRight = document.getElementById('audioplayer-arrow-right');

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
        //slide.addEventListener('touchstart', scrubbingDisc);
        //slide.addEventListener('mousedown', scrubbingDisc);
    });
}

// functions - handle general data --------------------------------------------------------------------------------
function updateCurrentIndex(index, oldIndex) {
    currentIndex = index;
    console.log(currentIndex);
    // if playing -> stop and play audio
    if (audioPlaying) {
        audioBufferSources[oldIndex].stop();
        playBuffer(currentIndex);
    }
    // call more functions on index change:
    // - reset rotation on old slide
    // - update center
}

// functions - handle audio play --------------------------------------------------------------------------------
// Function to play a specific buffer index
function playBuffer(index) {
    if (audioBufferSources[index]) {
        audioBufferSources[index].disconnect();
    }

    // Create a new buffer source for the audio to be played
    let source = audioContext.createBufferSource();
    source.buffer = audioBuffers[index];
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    audioBufferSources[index] = source;
    source.start(0);
}

/* not needed, del
// Example: play the next audio file in the sequence
function playNext() {
    if (currentIndex < audioBuffers.length - 1) {
        audioBufferSources[currentIndex].stop();
        currentIndex++;
    } else {
        audioBufferSources[currentIndex].stop();
        currentIndex = 0; // Loop back to the first track
    }
    playBuffer(currentIndex);
}*/

function testScubb () {
    const slider = document.getElementById('slider');

    slider.oninput = e => {
        let source = audioBufferSources[currentIndex];
        if( source ) { source.stop(0); }
        source = audioContext.createBufferSource();
        source.buffer = audioBuffers[currentIndex];
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        const offset = slider.value * audioBuffers[currentIndex].duration;
        const duration = 0.1;
        source.start(0, offset, duration);
      };
}

// functions - handle slider --------------------------------------------------------------------------------
function sliderTouchStart (index) {
    return function (event) {
        updateCurrentIndex(currentIndex, index);
        startPos = getPositionX(event);
        isDragging = true;
        animationID = requestAnimationFrame(animation);
    }
}
function sliderTouchEnd () {
    isDragging = false;
    cancelAnimationFrame(animationID);
    let movedBy = currentTranslate - prevTranslate;
  
    if (movedBy < -60 && currentIndex < slides.length - 1) {
        updateCurrentIndex(currentIndex + 1, currentIndex);
    } if (movedBy > 60 && currentIndex > 0) {
        updateCurrentIndex(currentIndex - 1, currentIndex);
    }
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
    if (isDragging) requestAnimationFrame(animation);
}
function setSliderPosition () {
    slider.style.transform = `translateX(${currentTranslate}px)`;
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
    }
}
function handleArrowRight () {
    if (currentIndex < slides.length - 1) {
        updateCurrentIndex(currentIndex + 1, currentIndex);
    }
}