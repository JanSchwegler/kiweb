// change perspective based on mousepos
window.addEventListener('resize', function() {
    initial();
});

// var
let mosueX,
    mouseY,
    windowW,
    windowH,
    element = document.querySelector('main');

// calls
initial();

// functions
function initial () {
    windowW = window.innerWidth;
    windowH = window.innerHeight;
}

window.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    let relativePositionX = (mouseX / windowW);
    let relativePositionY = (mouseY / windowH);
    element.style.marginLeft = "calc(10vw + " + (50 * relativePositionX) + "px)";
    element.style.paddingTop = (50 * relativePositionY) + 75 + "px";

    // TODO: add movement for player
});