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
    // calls - audioplayer.js
    initialisingAudioFiles();
    initialisingSlider();
    // calls - textToMosue.js
    initialisingTextToMouse(); // has the be after initialisingSlider. uses elements
    // loading.js
    domLoaded = true;
    removeScrollPreventionListeners();
});

window.addEventListener('resize', () => {
    updateClientSize();
    // bars.js
    createBars();
    // textToMosue.js
    mouseText();
    // audioplayer.js
    setPositionByIndex();
    updateScrubberCenter();
});

function updateClientSize () {
    documentWidth = document.documentElement.clientWidth;
    documentHeight = document.documentElement.clientHeight;
}

function updateMosuePosition (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}