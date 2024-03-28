let hoverTextElement, displayText, hideTextTimeout, sectionElements, textSpaceing, documentWidth, documentHeight, x, y;

window.onload = function() {
    hoverTextElement = document.getElementById("mouseText");
    displayText = false;
    hideTextTimeout = null;
    sectionElements = document.querySelectorAll("section");
    textSpaceing = 5;
    documentWidth = document.documentElement.clientWidth;
    documentHeight = document.documentElement.clientHeight;
    sectionElements.forEach(e => {
        e.addEventListener('mouseenter', function(event) {
            setText(event.target);
        });
    });
    document.addEventListener('mouseleave', mouseLeave);
    document.addEventListener('mousemove', mouseText);
}

window.addEventListener('resize', () => {
    documentWidth = document.documentElement.clientWidth;
    documentHeight = document.documentElement.clientHeight;
    mouseText();
});

function mouseText (event) {
    clearTimeout(hideTextTimeout);
    x = event.clientX;
    y = event.clientY + 30;
    // textSpaceing
    if (x > documentWidth - (hoverTextElement.clientWidth / 2) - textSpaceing) {
        x = documentWidth - (hoverTextElement.clientWidth / 2) - textSpaceing;
    } else if (x < (hoverTextElement.clientWidth / 2) + textSpaceing) {
        x = (hoverTextElement.clientWidth / 2) + textSpaceing;
    }
    if (y > documentHeight - hoverTextElement.clientHeight - textSpaceing) {
        y = documentHeight - hoverTextElement.clientHeight - textSpaceing;
    }
    // show text if hidden
    if (!displayText) {
        hoverTextElement.style.display = "block";
        hoverTextElement.style.opacity = "1";
        hoverTextElement.style.left = x + "px";
        hoverTextElement.style.top = y + "px";
        displayText = true;
        console.log("instant");
    }
    hoverTextElement.style.left = x + "px";
    hoverTextElement.style.top = y + "px";
}

function setText (e) {
    let text;
    switch (e.id) {
        case "audioplayer":
            /*if (getPlayingState()) { // just var from other file?
                text = "scrubb me";
            } else {
                text = "play me";
            }*/
            text = "play me";
            break;
        case "text1":
            text = "text 1";
            break;
        case "text2":
            text = "text 2";
            break;
        case "text3":
            text = "Text 3";
            break;
        default:
            text = "";
    }
    hoverTextElement.innerHTML = text;
}

function mouseLeave () {
    hoverTextElement.style.opacity = "0";
    displayText = false;
    hideTextTimeout = setTimeout(function() {
        hoverTextElement.style.display = "none";
    }, 300);
}