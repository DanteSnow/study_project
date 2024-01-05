import { saveState } from './undo_redo.js';

const canvas = document.querySelector('.paint-box');
const ctx = canvas.getContext('2d');
let drawing = false;
let lastX = 0;
let lastY = 0;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

function resizeCanvas() {
  // 캔버스의 현재 내용을 임시 캔버스에 저장
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCtx.drawImage(canvas, 0, 0);

  // 캔버스 크기 조정
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 캔버스에 임시 내용을 다시 그림
  ctx.drawImage(tempCanvas, 0, 0);
}

// 캔버스 크기 초기 설정
resizeCanvas();

// 브라우저 창 리사이즈 시 캔버스 크기 조정
window.addEventListener('resize', resizeCanvas);

// 기존 이벤트 리스너 내부 로직 업데이트
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

// draw 함수 수정
function draw(e) {
  if (!drawing) return;

  // 캔버스 상의 좌표 계산
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
