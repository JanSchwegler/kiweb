// var
let bars;

// definitions, calls & listeners
window.onload = function() {
    bars = document.querySelectorAll(".bars div");

    animateBars();
}

// functions
function animateBars() {
    let styleE = document.createElement("style");
    document.body.insertBefore(styleE, document.body.firstChild);
    bars.forEach((e, i) => {
        let randomStart = Math.floor(Math.random() * 41) + 60;
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