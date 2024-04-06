/*const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = document.querySelector('audio');

const source = audioCtx.createMediaElementSource(audioElement); // Problem
//const analyser = audioCtx.createAnalyser();
//analyser.fftSize = 256;

//source.connect(analyser);
//analyser.connect(audioCtx.destination);
source.connect(audioCtx.destination);

//const bufferLength = analyser.frequencyBinCount;
//const dataArray = new Uint8Array(bufferLength);

//audioElement.play();

function draw() {
    //analyser.getByteFrequencyData(dataArray);

    //console.log(bufferLength);
    //console.log(dataArray);

    requestAnimationFrame(draw);
}
draw();*/
/*
window.onload = function() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = document.querySelector('audio');
    const source = audioCtx.createMediaElementSource(audioElement);
    source.connect(audioCtx.destination);

    document.addEventListener("mousedown", function() {
        let audio = document.querySelector('audio');
        audio.play();
    });
};*/

window.onload = function() {
    const audioElement = document.querySelector('audio');
    
    // Function to play the audio
    function playAudio() {
        // Check if audio is paused or not
        if (audioElement.paused) {
            audioElement.play().catch(function(error) {
                // Autoplay was prevented
                console.log('Autoplay prevented: ', error);
            });
        } else {
            audioElement.pause();
        }
    }

    // Function to analyze the audio
    function analyzeAudio() {
        
        analyser.fftSize = 256;
        
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        
        // You can perform analysis here
        // For example, you can get frequency data or waveform data
        
        // Example: Getting frequency data
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        
        // Example: Logging the frequency data
        console.log(dataArray);
    }

    // Event listener to play/pause the audio when mouse is clicked
    document.addEventListener("mousedown", function() {
        playAudio();
    });

    // Event listener to analyze the audio when mouse is moved
    document.addEventListener("mousemove", function() {
        analyzeAudio();
    });
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaElementSource(audioElement);
        const analyser = audioCtx.createAnalyser();
};
