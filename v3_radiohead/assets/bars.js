window.onload = function() {
    createBars();
}

window.addEventListener('resize', () => {
    createBars();
});

function createBars() {
    let barParent = document.querySelectorAll(".bars");
    // del existing bars
    barParent.forEach((e) => {
        while (e.firstChild) {
            e.removeChild(e.firstChild);
        }
    });
    // create bars
    let width = window.innerWidth;
    let height = window.innerHeight;
    let barCount = Math.floor((height - ((0.23 * width + 50))) / 55) + 1;
    barParent.forEach((e) => {
        for (let i = 0; i < barCount; i++) {
            e.appendChild(document.createElement("div"));
        }
    });
    animateBars();
}

function animateBars() {
    let bars = document.querySelectorAll(".bars div");
    let styleE = document.createElement("style");
    document.body.insertBefore(styleE, document.body.firstChild);
    bars.forEach((e, i) => {
        let randomStart = Math.floor(Math.random() * 41) + 60; // do while function
        styleE.innerHTML += `@keyframes bar${i} {
            0%   {
                width: ${randomStart}%;
            }
            50%  {
                width: ${Math.floor(Math.random() * 41) + 60}%;
            }
            100% {
                width: ${randomStart}%;
            }
          }
        `;
        if (Math.random() < 0.5) {
            e.style.alignSelf = "end";
        }
        e.style.animation = `bar${i} ${(Math.random() * 5) + 2}s infinite linear`;
    });
}