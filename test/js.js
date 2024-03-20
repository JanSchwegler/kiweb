let slides = Array.from(document.querySelectorAll('.slide'));
let currentIndex = 0;

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
});