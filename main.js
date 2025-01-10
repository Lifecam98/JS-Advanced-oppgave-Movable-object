const box = document.getElementById("box");
const h1 = document.querySelector("h1");
const buttons = {
    up: document.getElementById("upArrow"),
    down: document.getElementById("downArrow"),
    left: document.getElementById("leftArrow"),
    right: document.getElementById("rightArrow")};

    
    document.addEventListener('DOMContentLoaded', (event) => {
    const box = document.getElementById("box");
    const initialLeft = (window.innerWidth - box.offsetWidth) / 2;
    const initialTop = (window.innerHeight - box.offsetHeight) / 2;
    box.style.left = initialLeft + "px";
    box.style.top = initialTop + "px";
});

function moveBox (direction) {
    const step = 20;
    const boxStyle = window.getComputedStyle(box);
    const top = parseInt(boxStyle.top);
    const left = parseInt(boxStyle.left);
    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let newTop = top;
    let newLeft = left;

    switch (direction) {
    case "up":
        newTop = Math.max(0, top - step);
        break;
    case "down":
        newTop = Math.min(windowHeight - boxHeight, top + step);
        break;
    case "left":
        newLeft = Math.max(0, left - step);
        break;
    case "right":
        newLeft = Math.min(windowWidth - boxWidth, left + step);
        break;
    default:
        console.error('Invalid direction:', direction);
    }

    box.style.top = newTop + "px";
    box.style.left = newLeft + "px";
}


buttons.up.addEventListener('click', function() {
    moveBox('up');
});
buttons.down.addEventListener('click', function() {
    moveBox('down');
});
buttons.left.addEventListener('click', function() {
    moveBox('left');
});
buttons.right.addEventListener('click', function() {
    moveBox('right');
});

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case "ArrowUp":
            moveBox('up');
            break;
        case "ArrowDown":
            moveBox('down');
            break;
        case "ArrowLeft":
            moveBox('left');
            break;
        case "ArrowRight":
            moveBox('right');
            break;
    }
});

document.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON' || box.contains(event.target)) return;

    const clickX = event.clientX;
    const clickY = event.clientY;

    const newLeft = Math.min(Math.max(0, clickX - box.offsetWidth / 2), window.innerWidth - box.offsetWidth);
    const newTop = Math.min(Math.max(0, clickY - box.offsetHeight / 2), window.innerHeight - box.offsetHeight);

    const h1Rect = h1.getBoundingClientRect();

    const boxRect = {
        top: newTop,
        left: newLeft,
        right: newLeft + box.offsetWidth,
        bottom: newTop + box.offsetHeight
    };

    const isOverlapping = !(boxRect.right < h1Rect.left || 
                            boxRect.left > h1Rect.right || 
                            boxRect.bottom < h1Rect.top || 
                            boxRect.top > h1Rect.bottom);

    if (!isOverlapping) {
        box.style.left = newLeft + "px";
        box.style.top = newTop + "px";
    }
});