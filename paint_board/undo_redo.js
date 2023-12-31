let undoStack = [], redoStack = [];
const canvas = document.querySelector('.paint-box');
const ctx = canvas.getContext('2d');

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
