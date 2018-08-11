import * as Vec2 from "./vec2.js";

export function check(scene) {
  const ret = scene.map(e=> ({entity:e, collisions:[]}));
  scene.forEach((e1,ix) => {
    scene.slice(ix+1).forEach((e2, ix2) => {
      if(test(e1.collisionBody(), e2.collisionBody())) {
        ret[ix].collisions.push(e2);
        ret[ix + ix2 + 1].collisions.push(e1);
      }
    });
  });

  return ret.filter(r => r.collisions.length !== 0);
}

export function test(a, b) {
  const invert = a.invert !== b.invert;
  switch (a.type) {
    case 'point':
      switch (b.type) {
        case 'point':
          return invert !== pointPointTest(a, b);
        case 'circle':
          return invert !== pointCircleTest(a, b);
        default:
          console.error(`Unknown collision body type: ${b.type}`);
          return false;
      }
      break;
    case 'circle':
      switch (b.type) {
        case 'point':
          return invert !== pointCircleTest(b, a);
        case 'circle':
          return invert !== circleCircleTest(a, b);
        default:
          console.error(`Unknown collision body type: ${b.type}`);
          return false;
      }
      break;
    default:
      console.error(`Unknown collision body type: ${a.type}`);
      return false;
  }

  console.error('End of collision test: I should never be reached!');
  return false;
}

function pointPointTest(a, b) {
  return Vec2.equals(a.center, b.center);
}

function pointCircleTest(p, c) {
  return Vec2.mag(Vec2.sub(p.center, c.center)) <= c.radius;
}

function circleCircleTest(a, b) {
  return Vec2.mag(Vec2.sub(a.center, b.center)) <= (a.radius + b.radius);
}
