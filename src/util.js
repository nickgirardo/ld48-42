import * as Vec2 from "./vec2.js";

export function drawVec(canvas, ctx, center, verts, rotation, color) {
  const normalize = (vert) => {
    const rotated = Vec2.rotate(vert, rotation);
    return {x: canvas.width*(center.x+rotated.x), y: canvas.width*(center.y+rotated.y)}
  };

  const ayy = verts.map(normalize);

  ctx.fillStyle = color;

  ctx.beginPath()
  ctx.moveTo(ayy[0].x, ayy[0].y);
  ayy.slice(1).forEach(v => ctx.lineTo(v.x, v.y));
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
}
