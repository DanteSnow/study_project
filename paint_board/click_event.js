document.addEventListener('DOMContentLoaded', function () {
  let colorElements = document.querySelectorAll('.select-color');

  colorElements.forEach(function (elem) {
    elem.addEventListener('click', function () {
      colorElements.forEach(e => e.classList.remove('highlighted'));

      this.classList.add('highlighted');
    });
  });
});
