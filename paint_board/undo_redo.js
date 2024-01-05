let undoStack = [], redoStack = [];
const canvas = document.querySelector('.paint-box');
const ctx = canvas.getContext('2d');

const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');

undoButton.addEventListener('mousedown', function () {
  this.classList.add('btn-click');
});

undoButton.addEventListener('mouseup', function () {
  this.classList.remove('btn-click');
});

redoButton.addEventListener('mousedown', function () {
  this.classList.add('btn-click');
});

redoButton.addEventListener('mouseup', function () {
  this.classList.remove('btn-click');
});


export function saveState() {
  undoStack.push(canvas.toDataURL());
  redoStack = [];
}

function undo() {
  if (undoStack.length > 1) {
    redoStack.push(undoStack.pop());
    redrawCanvas(undoStack[undoStack.length - 1]);
  }
}

function redo() {
  if (redoStack.length > 0) {
    undoStack.push(redoStack.pop());
    redrawCanvas(undoStack[undoStack.length - 1]);
  }
}

function redrawCanvas(newSrc) {
  const img = new Image();
  img.src = newSrc;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
}

document.getElementById('undo').addEventListener('click', undo);
document.getElementById('redo').addEventListener('click', redo);

saveState();
