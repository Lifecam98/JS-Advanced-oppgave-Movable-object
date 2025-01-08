const box = document.getElementById("box");
const buttons = {
    up: document.getElementById("upArrow"),
    down: document.getElementById("downArrow"),
    left: document.getElementById("leftArrow"),
    right: document.getElementById("rightArrow")
}

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
    if (event.target.tagname === 'button') return;

    const clickX = event.clientX;
    const clickY = event.clientY;

    const newLeft = Math.min(Math.max(0, clickX - box.offsetWidth / 2), window.innerWidth - box.offsetWidth);
    const newTop = Math.min(Math.max(0, clickY - box.offsetHeight / 2), window.innerHeight - box.offsetHeight);

    box.style.left = newLeft + "px";
    box.style.top = newTop + "px";
})
