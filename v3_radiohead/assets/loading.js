let loadingAnimation = false,
    domLoaded = false;

function addScrollPreventionListeners() {
    window.scrollTo(0, 0);
    document.addEventListener('wheel', preventDefaultScroll, { passive: false });
    document.addEventListener('keydown', preventDefaultArrowScroll);
    document.addEventListener('touchmove', preventDefaultScroll, { passive: false });
    addBodyOverflowHiddenStyle();
    document.body.style.maxHeight = '100vh';
    document.body.style.overflow = 'hidden';

    setTimeout(function() {
        loadingAnimation = true;
        removeScrollPreventionListeners();
    }, 3000);
}

function removeScrollPreventionListeners() {
    if (loadingAnimation && domLoaded) { // && if loading is finisch
        document.removeEventListener('wheel', preventDefaultScroll);
        document.removeEventListener('keydown', preventDefaultArrowScroll);
        document.removeEventListener('touchmove', preventDefaultScroll);
        removeBodyOverflowHiddenStyle();
        document.body.style.maxHeight = 'initial';
        document.body.style.overflow = 'initial';
        bars.forEach((e, i) => {
            setTimeout(function() {
                e.style.marginLeft = "0vw";
                e.style.marginRight = "0vw";
            }, (i + 1) * 100);
        });
        setTimeout(function() {
            document.getElementById("audioplayer").style.top = 0;
        }, bars.length * 100 - 800);
    }
}

function preventDefaultScroll(event) {
    event.preventDefault();
}
function preventDefaultArrowScroll(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
    }
}
function addBodyOverflowHiddenStyle() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
}
function removeBodyOverflowHiddenStyle() {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
}

addScrollPreventionListeners();