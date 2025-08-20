import { rgbTokenToColor } from "./color";
import { tokens } from "@styles/color-theme";

type SchemeType = "light" | "dark";

/**
 * tailwind config에 정의한 토큰 문자열을 RGB 색상 문자열로 변환합니다.
 * @param scheme  "light" | "dark"
 * @param token - 예) "primary-500"
 * @returns `rgb` 형식의 CSS 색상 문자열을 반환합니다.
 * 예: "rgb(200,71,113)"
 */
export default function getColorByTwToken(scheme: SchemeType, token: string) {
  const rgbToken =
    tokens[scheme][`--color-${token}`] || tokens[scheme][`--color-neutral-50`]; // "200 71 113"
  const rgbColor = rgbTokenToColor(rgbToken, 1);

  return rgbColor;
}
