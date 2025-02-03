import { config } from "./config";
import { canvas } from "./canvas";
import { Player } from "./player";

export class Enemy {
  type: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  health: number;
  attack: number;
  defense: number;

  constructor(x: number, y: number, typeKey: string, typeConfig: { [key: string]: any }) {
    this.type = typeKey;
    this.x = x;
    this.y = y;
    this.size = typeConfig.size;
    this.speed = typeConfig.speed;
    this.color = typeConfig.color;
    this.health = typeConfig.health;
    this.attack = typeConfig.attack;
    this.defense = typeConfig.defense;
  }

  update(player: Player): void {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.hypot(dx, dy);
    if (distance > 0) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

export class EnemyManager {
  enemies: Enemy[];

  constructor() {
    this.enemies = [];
    // Spawn an enemy at the interval specified in config.
    setInterval(() => this.spawnEnemy(), config.enemySpawnInterval);
  }

  spawnEnemy(): void {
    let x = 0,
      y = 0;
    const edge = Math.floor(Math.random() * 4);
    if (edge === 0) {
      // Top
      x = Math.random() * canvas.width;
    } else if (edge === 1) {
      // Right
      y = Math.random() * canvas.height;
    } else if (edge === 2) {
      // Bottom
      x = Math.random() * canvas.width;
    } else {
      // Left
      y = Math.random() * canvas.height;
    }
    // Select a random enemy type.
    const enemyTypeKeys = Object.keys(config.enemyTypes);
    const randomTypeKey = enemyTypeKeys[Math.floor(Math.random() * enemyTypeKeys.length)];
    const typeConfig = config.enemyTypes[randomTypeKey];
    // Adjust spawn coordinate based on the chosen edge.
    if (edge === 0) {
      y = -typeConfig.size;
    } else if (edge === 1) {
      x = canvas.width + typeConfig.size;
    } else if (edge === 2) {
      y = canvas.height + typeConfig.size;
    } else {
      x = -typeConfig.size;
    }
    this.enemies.push(new Enemy(x, y, randomTypeKey, typeConfig));
  }

  update(player: Player): void {
    this.enemies.forEach(enemy => enemy.update(player));
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.enemies.forEach(enemy => enemy.draw(ctx));
  }

  getClosestEnemy(player: Player): Enemy | null {
    let closestEnemy: Enemy | null = null;
    let closestDist = Infinity;
    this.enemies.forEach(enemy => {
      const dx = enemy.x - player.x;
      const dy = enemy.y - player.y;
      const distance = Math.hypot(dx, dy);
      if (distance < closestDist) {
        closestDist = distance;
        closestEnemy = enemy;
      }
    });
    return closestEnemy;
  }

  removeEnemy(enemyToRemove: Enemy): void {
    this.enemies = this.enemies.filter(enemy => enemy !== enemyToRemove);
  }
}