import { useEffect, useCallback, useState, useRef } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import RootBackground from "@components/RootBackground";
import { preloadMoodImages } from "@features/mood/services/moodAssets";

SplashScreen.preventAutoHideAsync().catch(() => {}); // 스플래시 자동숨김 방지

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isFontsLoaded] = useFonts({
    "binggrae-bold": require("@assets/fonts/Binggrae-Bold.otf"),
    binggrae: require("@assets/fonts/Binggrae.otf"),
  });

  const [isReady, setIsReady] = useState(false);
  const preloadStartedRef = useRef(false);

  // 폰트가 로드되면, 이미지도 프리로드한 뒤 준비 완료
  useEffect(() => {
    if (!isFontsLoaded || preloadStartedRef.current) return;

    preloadStartedRef.current = true;
    (async () => {
      try {
        await preloadMoodImages(); // mood 이미지 프리로드
      } catch (e) {
        console.warn("preloadMoodImages failed:", e);
      } finally {
        setIsReady(true); // 폰트 + 이미지 준비 완료
      }
    })();
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
