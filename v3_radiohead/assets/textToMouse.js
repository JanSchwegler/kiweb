let hoverTextElement, 
    displayText = false, 
    hideTextTimeout = null, 
    sectionElements, 
    textSpaceing = 5,
    x,
    y,
    lastText = "";

function initialisingTextToMouse () {
    // set elements
    hoverTextElement = document.getElementById("mouseText");
    sectionElements = document.querySelectorAll("section");
    // set evenetlisteners
    sectionElements.forEach(e => {
        e.addEventListener("mouseleave", removeText);
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
        y = mouseY - (hoverTextElement.clientHeight / 2);
        // create max or min movement based on textSpacing
        if (x > documentWidth - (hoverTextElement.clientWidth / 2) - textSpaceing) {
            x = documentWidth - (hoverTextElement.clientWidth / 2) - textSpaceing;
        } else if (x < (hoverTextElement.clientWidth / 2) + textSpaceing) {
            x = (hoverTextElement.clientWidth / 2) + textSpaceing;
        }
        if (y > documentHeight - hoverTextElement.clientHeight - textSpaceing) {
            y = documentHeight - hoverTextElement.clientHeight - textSpaceing;
        } else if (y < textSpaceing) {
            y = textSpaceing;
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

function removeText () {
    hoverTextElement.innerHTML = lastText;
}

function setText (e, index = null) {
    lastText = hoverTextElement.innerHTML;
    if (index == null) {
        switch (e.id) {
            case "audioplayer":
                hoverTextElement.innerHTML = "Experience the energy";
                break;
            case "text1":
                hoverTextElement.innerHTML = "Feel the rhythm";
                break;
            case "text2":
                hoverTextElement.innerHTML = "Let yourself go";
                break;
            case "text3":
                hoverTextElement.innerHTML = "Let yourself go";
                break;
            case "audioplayer-arrow-left":
                hoverTextElement.innerHTML = "previous";
                break;
            case "audioplayer-arrow-right":
                hoverTextElement.innerHTML = "next";
                break;
            default:
                hoverTextElement.innerHTML = "";
        }
    } else {
        if (index == currentIndex && !audioPlaying) {
            hoverTextElement.innerHTML = "play";
        } else if (index == currentIndex && audioPlaying) {
            hoverTextElement.innerHTML = "scrubb me";
        } else if (index > currentIndex) {
            hoverTextElement.innerHTML = "next";
        } else if (index < currentIndex) {
            hoverTextElement.innerHTML = "previous";
        }
    }
}

function mouseLeave () {
    hoverTextElement.style.opacity = "0";
    displayText = false;
    hideTextTimeout = setTimeout(function() {
        hoverTextElement.style.display = "none";
    }, 300);
}