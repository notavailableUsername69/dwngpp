var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var isDrawing = false;
var undoStack = [];
var redoStack = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event listeners for touch and mouse actions
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("touchstart", handleTouchStart);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", handleTouchMove);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("touchend", stopDrawing);


var undoButton = document.getElementById("undoButton");
var redoButton = document.getElementById("redoButton");
var clearButton = document.getElementById("clearButton");
var colorPicker = document.getElementById("colorPicker");

undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);
clearButton.addEventListener("click", clear);
colorPicker.addEventListener("change", changeColor);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;

    var rect = canvas.getBoundingClientRect();
    var x = (e.clientX || e.touches[0].clientX) - rect.left;
    var y = (e.clientY || e.touches[0].clientY) - rect.top;

    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = colorPicker.value;

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
}

function stopDrawing() {
    isDrawing = false;
    context.beginPath();
    saveState();
}

function undo() {
    if (undoStack.length > 0) {
        var imageData = undoStack.pop();
        redoStack.push(canvas.toDataURL());
        var img = new Image();
        img.onload = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
        };
        img.src = imageData;
    }
}

function redo() {
    if (redoStack.length > 0) {
        var imageData = redoStack.pop();
        undoStack.push(canvas.toDataURL());
        var img = new Image();
        img.onload = function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
        };
        img.src = imageData;
    }
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    undoStack = [];
    redoStack = [];
}

function changeColor() {
    context.strokeStyle = colorPicker.value;
}

function saveState() {
    undoStack.push(canvas.toDataURL());
    redoStack =     context.strokeStyle = colorPicker.value;
}
function saveState() {
    undoStack.push(canvas.toDataURL());
    redoStack = [];
}
function handleTouchStart(e) {
    e.preventDefault();
    startDrawing(e.touches[0]);
}

function handleTouchMove(e) {
    e.preventDefault();
    draw(e.touches[0]);
}

 