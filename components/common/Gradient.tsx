import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, ViewStyle, StyleSheet } from "react-native";
import { gradients, type GradientKeyType } from "@styles/gradients";
import { useTheme } from "@providers/ThemeProvider";

interface GradientPropsType {
  variant?: GradientKeyType;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  className?: string;
  style?: ViewStyle;
  pointerEvents?: "box-none" | "box-only" | "none" | "auto";
  children?: React.ReactNode;
}

/**
 * Gradient component that applies a linear gradient background.
 */
export default function Gradient({
  variant = "background",
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  className,
  style,
  children,
  pointerEvents,
}: GradientPropsType) {
  const { theme } = useTheme();
  const scheme = theme === "dark" ? "dark" : "light";
  const { colors, locations } = gradients[scheme][variant];

  return (
    <View className={className} style={style} pointerEvents={pointerEvents}>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={colors}
        locations={locations}
        start={start}
        end={end}
        pointerEvents={"none"}
      />
      {children}
    </View>
  );
}
