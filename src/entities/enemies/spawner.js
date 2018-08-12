import * as Vec2 from "../../vec2.js";

import BasicEnemy from "./basic.js";
import Rusher from "./rusher.js";
import Shooter from "./shooter.js";

export default class Spawner {

  constructor(manager, arena, player) {
    this.manager = manager;
    this.arena = arena;
    this.player = player;

    this.name = "Spawner";

    this.spawnIntervals = [
      -1,
      70,
      60,
      50,
      40,
      30,
      15,
    ]

    this.spawnDoubleChance = [
      0,
      0.001,
      0.002,
      0.1,
      0.4,
      0.6,
      0.9,
    ]

    this.spawnTypes = [
      [1, 1, 1],
      [0.8, 0.99, 1],
      [0.6, 0.9, 1],
      [0.3, 0.75, 1],
      [0.1, 0.75, 1],
      [0.05, 0.75, 1],
      [0.02, 0.7, 1],
    ];

    this.enemyTypes = [
      (center) => this.manager.scene.push(new BasicEnemy(this.manager, this.player, center)),
      (center) => this.manager.scene.push(new Rusher(this.manager, this.player, center)),
      (center) => this.manager.scene.push(new Shooter(this.manager, this.player, center)),
    ];

    this.sinceLastSpawn = 0;
  }

  update() {
    const spawnEnemy = () => {
      const rand = Math.random();
      const enemyType = this.spawnTypes[this.manager.level].findIndex(s=>s>rand);

      const center = Vec2.add(Vec2.sMul(Vec2.rotate(Vec2.up(), Math.random()*Math.PI*2), this.arena.radius), {x: 0.5, y: 0.5});

      this.enemyTypes[enemyType](center);
    }
    this.sinceLastSpawn ++;

    if(this.sinceLastSpawn > this.spawnIntervals[this.manager.level]) {
      this.sinceLastSpawn = 0;
      spawnEnemy();
      if(this.spawnDoubleChance[this.manager.level] > Math.random())
        spawnEnemy();
    }

  }

  draw() {}

}
