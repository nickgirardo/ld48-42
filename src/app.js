import * as Keyboard from "./keyboard.js";

import Manager from "./entities/manager.js";

const canvas = document.querySelector('canvas#ld48');
const ctx = canvas.getContext('2d');

let manager;

function update() {
  if(!manager)
    return;

  manager.update();
  draw();

  window.requestAnimationFrame(update);
}

function draw() {
  if(!manager)
    return;

  manager.draw(canvas, ctx);
}

function resize() {
  canvas.width = Math.min(window.innerHeight, window.innerWidth);
  canvas.height = Math.min(window.innerHeight, window.innerWidth);

  draw();
}

function init() {
  Keyboard.init();

  resize()
  window.addEventListener('resize', resize);

  manager = new Manager(canvas);

  update();
}

init();
