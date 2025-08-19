import { rgbTokenToColor } from "./color";
import { tokens } from "../styles/color-theme";

type SchemeType = "light" | "dark";

export default function getBottomTabColors(scheme: SchemeType) {
  const activeToken = tokens[scheme]["--color-primary-500"]; // "200 71 113"
  const inactiveToken = tokens[scheme]["--color-neutral-300"]; // "131 129 142"

  const active = rgbTokenToColor(activeToken, 1);
  const inactive = rgbTokenToColor(inactiveToken, 1);

  return { active, inactive };
}
