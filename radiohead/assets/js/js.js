// Create Bars
function createBars() {
    let barHeight = 50;
    let barSpaceing = 5;
    let barContainer = document.getElementById("barsAnimate");
    let barContainerHeight = window.innerHeight - document.getElementsByTagName("main")[0].clientHeight;
    let barCount = Math.round(Math.abs(barContainerHeight) / (barHeight + barSpaceing));
    let barAdaptHeight = (barContainerHeight - (barSpaceing * (barCount))) / barCount;

    barContainer.style.paddingTop = barSpaceing + "px";

    // remove existing elements
    let divs = barContainer.getElementsByTagName('div');
    if (divs.length > 0) {
        while (divs.length > 0) {
            divs[0].remove();
        }
    }

    for (let i = 0; i < barCount; i++) {
        let div = document.createElement('div');
        div.id = "bar" + i;
        barContainer.appendChild(div);
    }

    // Dieser Teil in das obere Array schieben?
    Array.from(barContainer.getElementsByTagName('div')).forEach(div => {
        div.style.height = barAdaptHeight + 'px';
        div.style.marginBottom = barSpaceing + 'px';
        div.style.animationName = "bar" + (Math.floor(Math.random() * 10) + 1);
        div.style.animationDuration = (Math.floor(Math.random() * 4) + 3) + "s";
    });
}

window.addEventListener('mousemove', function(event) {
    let mouseX = event.clientX;
    let windowWidth = window.innerWidth;
    let relativePosition = (mouseX / windowWidth) * 2 - 1;
    let barContainer = document.getElementById("barsAnimate");
    

    if (relativePosition >= 0) {
        barContainer.style.marginRight = relativePosition * -10 + "%";
        barContainer.style.marginLeft = "0%";
    } else {
        barContainer.style.marginLeft = relativePosition * 10 + "%";
        barContainer.style.marginRight = "0%";
    }

    barContainer.style.transition = "0s";
});
document.addEventListener('mouseleave', function(event) {
    let barContainer = document.getElementById("barsAnimate");
    barContainer.style.transition = "0.3s";
    barContainer.style.marginLeft = "0%";
    barContainer.style.marginRight = "0%";
});

// Call Functions
createBars();

// Window Resize
window.addEventListener('resize', function() {
    createBars();
});