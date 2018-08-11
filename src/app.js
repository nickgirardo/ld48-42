
const canvas = document.querySelector('canvas#ld48');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = Math.min(window.innerHeight, window.innerWidth);
  canvas.height = Math.min(window.innerHeight, window.innerWidth);
}

function init() {
  resize()
  window.addEventListener('resize', resize);
}

init();
