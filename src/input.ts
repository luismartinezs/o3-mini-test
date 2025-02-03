export const keys: Record<string, boolean> = {};

export function setupInput(): void {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    keys[e.key] = true;
  });
  window.addEventListener("keyup", (e: KeyboardEvent) => {
    keys[e.key] = false;
  });
}