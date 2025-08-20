// "200 71 113" → {r:200,g:71,b:113}
export function parseRgbToken(rgbToken: string) {
  const [r, g, b] = rgbToken.trim().split(/\s+/).map(Number);
  return { r, g, b };
}

/**
 * RGB 토큰 문자열을 CSS 색상 문자열로 변환합니다.
 * @param rgbToken - "r g b" 형식의 RGB 토큰 문자열입니다.
 * 예: "200 71 113".
 * @param alpha - 알파 값(기본값은 1, 불투명).
 * @returns `rgb` 또는 `rgba` 형식의 CSS 색상 문자열을 반환합니다.
 * 예: "rgb(200,71,113)" 또는 "rgba(200,71,113,0.5)".
 */
export function rgbTokenToColor(rgbToken: string, alpha: number = 1) {
  const { r, g, b } = parseRgbToken(rgbToken);
  return alpha >= 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${alpha})`;
}
