import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, ViewStyle } from "react-native";

type Props = {
  isOpen: boolean;
  duration?: number; // 200~250ms 권장
  offset?: number; // 슬라이드 시작 거리(px)
  style?: ViewStyle;
  children: React.ReactNode;
};

export default function FadeSlideCollapsible({
  isOpen,
  duration = 220,
  offset = 12,
  style,
  children,
}: Props) {
  const [render, setRender] = useState(isOpen); // unmount 제어
  const progress = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    if (isOpen) setRender(true);
    Animated.timing(progress, {
      toValue: isOpen ? 1 : 0,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !isOpen) setRender(false);
    });
  }, [isOpen, duration, progress]);

  if (!render) return null;

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [offset, 0], // 아래서 위로 슬라이드 인
  });

  const opacity = progress; // 0 → 1

  return (
    <Animated.View
      style={[{ opacity, transform: [{ translateY }] }, style]}
      pointerEvents={isOpen ? "auto" : "none"}
    >
      {children}
    </Animated.View>
  );
}
