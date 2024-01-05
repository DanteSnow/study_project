document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.querySelector('.paint-box');

  document.querySelectorAll('.select-color').forEach(item => {
    item.addEventListener('click', function () {
      if (this.classList.contains('white')) {
        canvas.style.cursor = 'url("erase.png") 0 32, auto';
      } else {
        canvas.style.cursor = 'url("pencil.png") 0 32, auto';
      }
    });
  });
});