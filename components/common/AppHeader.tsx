import { cn } from "@utils/cn";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { memo } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ThemedIonicon } from "./ThemedIonicon";

/**
 * 공통 헤더
 * - 좌측: back
 * - 중앙: 타이틀
 * - 우측: close
 */
export type AppHeaderPropsType = {
  /** 중앙 컨텐츠 타입 */
  centerType?: "title" | "logo";
  /** centerType === 'title' 일 때 */
  title?: string;
  /** 기본 좌측 버튼 */
  leftType?: "back" | "none";
  onPressLeft?: () => void;
  /** 기본 우측 버튼 */
  rightType?: "close" | "none";
  onPressRight?: () => void;
  isDisabledRight?: boolean;
};

function _AppHeader({
  centerType,
  title,
  leftType = "none",
  onPressLeft,
  rightType = "none",
  onPressRight,
  isDisabledRight,
}: AppHeaderPropsType) {
  // const insets = useSafeAreaInsets();
  // const top = Math.max(insets.top, Platform.OS === "android" ? 8 : 12);
  const BAR_HEIGHT = 56;

  const handleLeft = () => {
    if (leftType !== "none") {
      onPressLeft?.();
    }
    if (leftType === "back" && router.canGoBack()) {
      router.back();
    }
  };

  return (
    <BlurView intensity={24} tint="light" style={{ height: BAR_HEIGHT }}>
      <View
        style={{ height: BAR_HEIGHT }}
        className={cn("px-5", "border-b border-white/20")}
      >
        <View className="flex-row items-center justify-between h-full">
          {/* LEFT */}
          <View
            className={cn(
              "w-10 h-10 -ml-1 items-start justify-center",
              centerType === "logo" && "w-0 h-0"
            )}
          >
            {leftType !== "none" && (
              <Pressable onPress={handleLeft} hitSlop={12}>
                {leftType === "back" && (
                  <ThemedIonicon
                    name="chevron-back"
                    size={24}
                    colorToken="neutral-500"
                  />
                )}
              </Pressable>
            )}
          </View>

          {/* CENTER */}
          <View
            className={cn(
              "flex-1 items-center justify-center",
              centerType === "logo" && "items-start"
            )}
          >
            {centerType === "title" ? (
              <Text numberOfLines={1} className="text-lg text-neutral-500">
                {title}
              </Text>
            ) : centerType === "logo" ? (
              <Image
                source={require("@assets/images/logo.png")}
                style={{
                  width: 54,
                  height: 38,
                  resizeMode: "contain",
                }}
              />
            ) : null}
          </View>

          {/* RIGHT */}
          <View className="w-10 h-10 items-end justify-center">
            {rightType !== "none" && (
              <Pressable
                onPress={onPressRight}
                disabled={isDisabledRight}
                hitSlop={12}
                className="w-10 h-10 items-center justify-center"
              >
                {rightType === "close" && (
                  <ThemedIonicon
                    name="close"
                    size={24}
                    colorToken={isDisabledRight ? "neutral-300" : "neutral-500"}
                  />
                )}
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </BlurView>
  );
}

export const AppHeader = memo(_AppHeader);
