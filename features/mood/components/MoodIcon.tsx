import React from "react";
import { SvgProps } from "react-native-svg";
import Angry from "@assets/icons/moods/angry.svg";
import Upset from "@assets/icons/moods/upset.svg";
import Sad from "@assets/icons/moods/sad.svg";
import Good from "@assets/icons/moods/good.svg";
import Happy from "@assets/icons/moods/happy.svg";
import Spectacular from "@assets/icons/moods/spectacular.svg";
import type { MoodIdType } from "@features/mood/types/mood";

const MAP: Record<MoodIdType, React.FC<SvgProps>> = {
  angry: Angry,
  upset: Upset,
  sad: Sad,
  good: Good,
  happy: Happy,
  spectacular: Spectacular,
};

type MoodIconPropsType = {
  name: MoodIdType;
  size?: number;
  color?: string; // 단색/현재색 기반 SVG일 때 유효
  accessibilityLabel?: string;
} & Omit<SvgProps, "width" | "height">;

export default function MoodIcon({
  name,
  size = 56,
  color,
  accessibilityLabel,
  ...rest
}: MoodIconPropsType) {
  const C = MAP[name];
  return (
    <C
      width={size}
      height={size}
      // color/fill 둘 다 전달 (SVG 구조에 따라 한쪽이 먹을 수 있음)
      {...(color ? { color, fill: color } : null)}
      accessibilityLabel={accessibilityLabel ?? name}
      accessible
      {...rest}
    />
  );
}
