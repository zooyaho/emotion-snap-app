// "200 71 113" → {r:200,g:71,b:113}
export function parseRgbToken(rgbToken: string) {
  const [r, g, b] = rgbToken.trim().split(/\s+/).map(Number);
  return { r, g, b };
}

// "200 71 113" + alpha → "rgb(...)" | "rgba(...)"
export function rgbTokenToColor(rgbToken: string, alpha: number = 1) {
  const { r, g, b } = parseRgbToken(rgbToken);
  return alpha >= 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${alpha})`;
}
