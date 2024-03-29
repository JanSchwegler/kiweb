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
    let barCount = Math.floor((height - (0.23 * width + 50)) / 55) + 1;
    barParent.forEach((e, i) => {
        if (barParent.length - 1 <= i) { // for last barParent
            for (let i = 0; i < Math.floor(height / 55); i++) {
                e.appendChild(document.createElement("div"));
            }
        } else { // all other barParent
            for (let i = 0; i < barCount; i++) {
                e.appendChild(document.createElement("div"));
            }
        }
    });
    setAnimationForBars();
}

function setAnimationForBars() {
    let bars = document.querySelectorAll(".bars div");
    let styleE;
    // crete a style element if there is none
    if (document.body.firstElementChild.tagName == "STYLE") {
        styleE = document.querySelector("body > style");
    } else {
        styleE = document.createElement("style");
        document.body.insertBefore(styleE, document.body.firstChild);
    }
    bars.forEach((e, i) => {
        // set start and end width
        let randomStart = (Math.random() * 41) + 60;
        let randomEnd = (Math.random() * 41) + 60;
        while (Math.abs(randomEnd - randomStart) < 15) {
            randomEnd = (Math.random() * 41) + 60;
        }
        styleE.innerHTML += `@keyframes bar${i} {
            0%   {
                width: ${randomStart}%;
            }
            50%  {
                width: ${randomEnd}%;
            }
            100% {
                width: ${randomStart}%;
            }
          }
        `;
        // set side
        if (Math.random() < 0.5) {
            e.style.alignSelf = "end";
        }
        // set duration and start animation
        e.style.animation = `bar${i} ${(Math.random() * 5) + 2}s infinite ease-in-out`;
    });
}