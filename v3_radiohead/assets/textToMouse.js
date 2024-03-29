let hoverTextElement, 
    displayText = false, 
    hideTextTimeout = null, 
    sectionElements, 
    textSpaceing = 5,
    x,
    y;

function initialisingTextToMouse () {
    // set elements
    hoverTextElement = document.getElementById("mouseText");
    sectionElements = document.querySelectorAll("section");
    // set evenetlisteners
    sectionElements.forEach(e => {
        e.addEventListener('mouseenter', function(event) {
            setText(event.target);
        });
    });
    document.addEventListener('mouseleave', mouseLeave);
    document.addEventListener('mousemove', mouseText);
}

function mouseText () {
    clearTimeout(hideTextTimeout);
    if (mouseX && mouseY) {
        x = mouseX;
        y = mouseY + 30;
        // create max or min movement based on textSpacing
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
        }
        // move text
        hoverTextElement.style.left = x + "px";
        hoverTextElement.style.top = y + "px";
    }
}

function setText (e) {
    switch (e.id) {
        case "audioplayer":
            /*if (getPlayingState()) { // just var from other file?
                text = "scrubb me";
            } else {
                text = "play me";
            }*/
            hoverTextElement.innerHTML = "play me";
            break;
        case "text1":
            hoverTextElement.innerHTML = "text 1";
            break;
        case "text2":
            hoverTextElement.innerHTML = "text 2";
            break;
        case "text3":
            hoverTextElement.innerHTML = "Text 3";
            break;
        default:
            hoverTextElement.innerHTML = "";
    }
}

function mouseLeave () {
    hoverTextElement.style.opacity = "0";
    displayText = false;
    hideTextTimeout = setTimeout(function() {
        hoverTextElement.style.display = "none";
    }, 300);
}