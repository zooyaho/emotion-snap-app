import { useEffect, useCallback, useState } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import RootBackground from "@components/RootBackground";

SplashScreen.preventAutoHideAsync().catch(() => {}); // 스플래시 자동숨김 방지

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFontsLoaded] = useFonts({
    "binggrae-bold": require("@assets/fonts/Binggrae-Bold.otf"),
    binggrae: require("@assets/fonts/Binggrae.otf"),
  });

  const [isReady, setIsReady] = useState(false);

  // 폰트가 다 로드되면 준비 완료 상태로
  useEffect(() => {
    if (isFontsLoaded) setIsReady(true);
  }, [isFontsLoaded]);

  // 레이아웃이 그려지는 시점에 스플래시 숨김
  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      try {
        await SplashScreen.hideAsync();
      } catch {}
    }
  }, [isReady]);

  if (!isReady) {
    return <View className="flex-1" onLayout={onLayoutRootView} />;
  }

  return (
    <RootBackground>
      <View className="flex-1" onLayout={onLayoutRootView}>
        {children}
      </View>
    </RootBackground>
  );
}
