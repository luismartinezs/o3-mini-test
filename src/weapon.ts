import { Player } from "./player";
import { EnemyManager } from "./enemyManager";
import { BulletManager } from "./bulletManager";

export interface WeaponConfig {
  name: string;
  shootingInterval: number;
  bulletConfig: { size: number; speed: number; color: string };
}

export class Weapon {
  name: string;
  shootingInterval: number;
  bulletConfig: { size: number; speed: number; color: string };
  player: Player;
  enemyManager: EnemyManager;
  bulletManager: BulletManager;
  intervalId: number | undefined;

  constructor(
    weaponConfig: WeaponConfig,
    player: Player,
    enemyManager: EnemyManager,
    bulletManager: BulletManager
  ) {
    this.name = weaponConfig.name;
    this.shootingInterval = weaponConfig.shootingInterval;
    this.bulletConfig = weaponConfig.bulletConfig;
    this.player = player;
    this.enemyManager = enemyManager;
    this.bulletManager = bulletManager;
    this.intervalId = window.setInterval(() => this.shoot(), this.shootingInterval);
  }

  shoot(): void {
    const enemy = this.enemyManager.getClosestEnemy(this.player);
    if (enemy) {
      this.bulletManager.shootBullet(this.player, enemy, this.bulletConfig);
    }
  }
}