import { keys } from "./input";
import { config } from "./config";
import { canvas } from "./canvas";

export class Player {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  dx: number;
  dy: number;

  constructor() {
    this.x = config.player.initial.x;
    this.y = config.player.initial.y;
    this.size = config.player.size;
    this.speed = config.player.speed;
    this.color = config.player.color;
    this.dx = 0;
    this.dy = 0;
  }

  update(): void {
    // Reset movement.
    this.dx = 0;
    this.dy = 0;
    if (keys["ArrowUp"] || keys["w"]) {
      this.dy = -this.speed;
    }
    if (keys["ArrowDown"] || keys["s"]) {
      this.dy = this.speed;
    }
    if (keys["ArrowLeft"] || keys["a"]) {
      this.dx = -this.speed;
    }
    if (keys["ArrowRight"] || keys["d"]) {
      this.dx = this.speed;
    }
    this.x += this.dx;
    this.y += this.dy;

    // Keep within canvas bounds.
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x > canvas.width - this.size) this.x = canvas.width - this.size;
    if (this.y > canvas.height - this.size) this.y = canvas.height - this.size;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}