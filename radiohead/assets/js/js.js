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

    Array.from(barContainer.getElementsByTagName('div')).forEach(div => {
        div.style.height = barAdaptHeight + 'px';
        div.style.marginBottom = barSpaceing + 'px';
        div.style.animationName = "bar" + (Math.floor(Math.random() * 6) + 1);
        div.style.animationDuration = (Math.floor(Math.random() * 4) + 3) + "s";
    });
}

// Call Functions
createBars();
console.log(window.innerHeight - document.getElementsByTagName("main")[0].clientHeight);
console.log(document.getElementsByTagName("main")[0].clientHeight);

// Window Resize
window.addEventListener('resize', function() {
    createBars();
});