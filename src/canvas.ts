import { config } from "./config";

const appContainer = document.getElementById("app")!;
const canvas = document.createElement("canvas");
export { canvas };
export const ctx = canvas.getContext("2d")!;

canvas.width = config.canvas.width;
canvas.height = config.canvas.height;

// Append the canvas to the app container
appContainer.appendChild(canvas);