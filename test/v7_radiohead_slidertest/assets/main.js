// general varables
let documentWidth,
    documentHeight,
    mouseX,
    mouseY;

document.addEventListener("DOMContentLoaded", function() {
    // eventListeners
    document.addEventListener('mousemove', updateMosuePosition);
    // calls
    updateClientSize();
    // calls - bars.js
    createBars();
    // calls - textToMosue.js
    initialisingTextToMouse();
    // calls - audioplayer.js
    initialisingAudioFiles();
    initialisingSlider();
});

window.addEventListener('resize', () => {
    updateClientSize();
    // bars.js
    createBars();
    // textToMosue.js
    mouseText();
    // audioplayer.js
});

function updateClientSize () {
    documentWidth = document.documentElement.clientWidth;
    documentHeight = document.documentElement.clientHeight;
}

function updateMosuePosition (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

// test stuff
document.addEventListener("mousedown", function() {
    //console.log("test");
    //playNext()
    //playBuffer(0)
})