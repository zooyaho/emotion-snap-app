import type { ColorValue } from "react-native";

export type GradientKeyType = "background";

// expo-linear-gradient 요구 타입
type Stops = {
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  locations?: readonly [number, number, ...number[]];
};

export const gradients: Record<
  "light" | "dark",
  Record<GradientKeyType, Stops>
> = {
  light: {
    background: {
      colors: ["#EED3F2", "#F1ACD5", "#FFCEB7", "#FFC58E", "#FFA755"] as const,
      locations: [0, 0.3, 0.5, 0.8, 1] as const,
    },
  },
  dark: {
    background: {
      colors: ["#593A59", "#957195", "#C2A8C2", "#C2A8C2"] as const,
      locations: [0, 0.7, 0.8, 1] as const,
    },
  },
};
