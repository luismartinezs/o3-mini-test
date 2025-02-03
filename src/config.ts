export interface CanvasConfig {
  width: number;
  height: number;
  backgroundColor: string;
}

export interface PlayerConfig {
  size: number;
  speed: number;
  color: string;
  initial: { x: number; y: number };
}

export interface BulletConfig {
  size: number;
  speed: number;
  color: string;
}

export interface WeaponConfig {
  name: string;
  shootingInterval: number;
  bulletConfig: BulletConfig;
}

export interface EnemyType {
  size: number;
  speed: number;
  color: string;
  health: number;
  attack: number;
  defense: number;
}

export interface Config {
  canvas: CanvasConfig;
  player: PlayerConfig;
  weapons: WeaponConfig[];
  enemySpawnInterval: number;
  enemyTypes: { [key: string]: EnemyType };
  bullet: BulletConfig;
}

export const config: Config = {
  canvas: {
    width: 800,
    height: 600,
    backgroundColor: "#333333"
  },
  player: {
    size: 20,
    speed: 4,
    color: "blue",
    initial: { x: 400, y: 300 }
  },
  // Define available weapons – you can add as many as you like.
  weapons: [
    {
      name: "BasicGun",
      shootingInterval: 1200, // in ms
      bulletConfig: {
        size: 5,
        speed: 2,
        color: "yellow"
      }
    },
    {
      name: "RapidFire",
      shootingInterval: 500,
      bulletConfig: {
        size: 4,
        speed: 4,
        color: "lightBlue"
      }
    }
  ],
  // Global enemy spawn interval.
  enemySpawnInterval: 500,
  // Define multiple enemy types with their stats.
  enemyTypes: {
    basic: {
      size: 20,
      speed: 1,
      color: "red",
      health: 1,
      attack: 1,
      defense: 0
    },
    fast: {
      size: 15,
      speed: 2,
      color: "orange",
      health: 0.5,
      attack: 0.5,
      defense: 0
    }
  },
  // Default bullet configuration (can be overridden by weapon-specific settings).
  bullet: {
    size: 5,
    speed: 5,
    color: "yellow"
  }
};