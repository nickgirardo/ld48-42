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
      45,
      32,
      20,
      15,
    ]

    this.spawnDoubleChance = [
      0,
      0.001,
      0.002,
      0.2,
      0.5,
      0.75,
      0.92,
    ]

    this.spawnTypes = [
      [1, 1, 1],
      [0.8, 0.99, 1],
      [0.6, 0.9, 1],
      [0.3, 0.8, 1],
      [0.1, 0.8, 1],
      [0.05, 0.8, 1],
      [0.02, 0.75, 1],
    ];

    this.enemyTypes = [
      "BasicEnemy",
      "Rusher",
      "Shooter",
    ];

    this.sinceLastSpawn = 0;
  }

  update() {
    const spawnEnemy = () => {
      const rand = Math.random();
      const enemyType = this.enemyTypes[this.spawnTypes[this.manager.level].findIndex(s=>s>rand)];
      this.manager.spawnEnemy(enemyType);
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
