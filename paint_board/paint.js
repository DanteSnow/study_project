import { saveState } from './undo_redo.js';

const canvas = document.querySelector('.paint-box');
const ctx = canvas.getContext('2d');
let drawing = false;
let lastX = 0;
let lastY = 0;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

function startDrawing(e) {
  drawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
}

function selectColor(newColor) {
  ctx.strokeStyle = newColor;
}

document.querySelectorAll('.select-color').forEach(item => {
  item.addEventListener('click', function () {
    const color = this.classList[1];
    selectColor(color);
  });
});

function draw(e) {
  if (!drawing) return;
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => {
  if (drawing) {
    drawing = false;
    saveState();
  }
});
canvas.addEventListener('mouseout', () => {
  if (drawing) {
    drawing = false;
    saveState();
  }
});
