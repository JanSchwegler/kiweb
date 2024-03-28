window.onload = function() {
    let hoverTextElement = document.getElementById("mouseText");
    let startText = false;
    // let hoverTextAudioPLayed = false;
    // let hideTextTimeout = null;
    // let hotfixStopClear = false;
    // event listeners
    document.addEventListener('mousemove', mouseText);
}




function mouseText (event) {
    // hotfixStopClear = true;
    hoverTextElement.innerHTML = "open";
    let x = event.clientX;
    let y = event.clientY;

    // change text based on element

    updatePosition(event);
    hoverTextElement.style.display = "block";
    hoverTextElement.style.opacity = "1";
    document.addEventListener('mousemove', updatePosition);
    event.target.addEventListener('mouseleave', () => {
        hoverTextElement.style.opacity = "0";
        hotfixStopClear = false;
        hideTextTimeout = setTimeout(function() {
            if (!hotfixStopClear) {
                document.removeEventListener('mousemove', updatePosition);
                hoverTextElement.style.display = "none";
            }
        }, 300);
    });

    function updatePosition (event) {
        hoverTextElement.style.left = x + "px";
        hoverTextElement.style.top = y + 30 + "px";
    }
}