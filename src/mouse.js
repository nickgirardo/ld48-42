
let loc = {x: 0, y: 0};

export function mouseLocation() {
  return loc;
}

export function init(canvas) {
  const handleMovement = (e) => {
    loc = {x: (e.clientX - canvas.offsetLeft)/canvas.width, y: (e.clientY - canvas.offsetTop)/canvas.height};
  }

  canvas.addEventListener("mousemove", handleMovement);

}
