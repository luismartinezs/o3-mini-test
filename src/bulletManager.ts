import { config } from "./config";
import { canvas } from "./canvas";
import { Player } from "./player";
import { Enemy } from "./enemyManager";

export class Bullet {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  speed: number;
  color: string;

  constructor(
    x: number,
    y: number,
    dx: number,
    dy: number,
    overrides?: Partial<{ size: number; speed: number; color: string }>
  ) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = overrides?.size || config.bullet.size;
    this.speed = overrides?.speed || config.bullet.speed;
    this.color = overrides?.color || config.bullet.color;
  }

  update(): void {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  isOutOfBounds(): boolean {
    return (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    );
  }
}

export class BulletManager {
  bullets: Bullet[];

  constructor() {
    this.bullets = [];
  }

  shootBullet(
    player: Player,
    enemy: Enemy,
    bulletConfigOverrides?: Partial<{ size: number; speed: number; color: string }>
  ): void {
    const bulletSize = bulletConfigOverrides?.size || config.bullet.size;
    const startX = player.x + player.size / 2 - bulletSize / 2;
    const startY = player.y + player.size / 2 - bulletSize / 2;
    const targetX = enemy.x + enemy.size / 2;
    const targetY = enemy.y + enemy.size / 2;
    let dx = targetX - startX;
    let dy = targetY - startY;
    const norm = Math.hypot(dx, dy) || 1;
    dx /= norm;
    dy /= norm;
    this.bullets.push(new Bullet(startX, startY, dx, dy, bulletConfigOverrides));
  }

  update(): void {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].update();
      if (this.bullets[i].isOutOfBounds()) {
        this.bullets.splice(i, 1);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.bullets.forEach(bullet => bullet.draw(ctx));
  }

  checkCollisions(enemyManager: { enemies: Enemy[]; removeEnemy(enemy: Enemy): void }): void {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      for (let j = enemyManager.enemies.length - 1; j >= 0; j--) {
        const enemy = enemyManager.enemies[j];
        if (
          bullet.x < enemy.x + enemy.size &&
          bullet.x + bullet.size > enemy.x &&
          bullet.y < enemy.y + enemy.size &&
          bullet.y + bullet.size > enemy.y
        ) {
          // On collision, remove both bullet and enemy.
          this.bullets.splice(i, 1);
          enemyManager.removeEnemy(enemy);
          break;
        }
      }
    }
  }
}