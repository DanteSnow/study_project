import { saveState } from './undo_redo.js';

const canvas = document.querySelector('.paint-box');
const ctx = canvas.getContext('2d');
let drawing = false;
let lastX = 0;
let lastY = 0;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

function resizeCanvas() {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCtx.drawImage(canvas, 0, 0);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.drawImage(tempCanvas, 0, 0);
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

function startDrawing(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  lastX = (e.clientX - rect.left) * scaleX;
  lastY = (e.clientY - rect.top) * scaleY;

  drawing = true;
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

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const mouseX = (e.clientX - rect.left) * scaleX;
  const mouseY = (e.clientY - rect.top) * scaleY;

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(mouseX, mouseY);
  ctx.stroke();
  lastX = mouseX;
  lastY = mouseY;
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
