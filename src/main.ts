import "./style.css";
import { setupInput } from "./input";
import { canvas, ctx } from "./canvas";
import { config } from "./config";
import { Player } from "./player";
import { EnemyManager } from "./enemyManager";
import { BulletManager } from "./bulletManager";
import { Weapon } from "./weapon";

setupInput();
const player = new Player();
const enemyManager = new EnemyManager();
const bulletManager = new BulletManager();

// Create weapons for the player based on the config.
const weapons = config.weapons.map(weaponConf => new Weapon(weaponConf, player, enemyManager, bulletManager));

function gameLoop(): void {
  // Update game entities.
  player.update();
  enemyManager.update(player);
  bulletManager.update();
  bulletManager.checkCollisions(enemyManager);

  // Clear the canvas.
  ctx.fillStyle = config.canvas.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw game entities.
  player.draw(ctx);
  enemyManager.draw(ctx);
  bulletManager.draw(ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop();