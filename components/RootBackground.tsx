import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Gradient from "@components/common/Gradient";

interface BackgroundViewPropsType {
  children: React.ReactNode;
}

function RootBackground({ children }: BackgroundViewPropsType) {
  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["left", "right", "top"]} // bottom 제외하여 안전영역 설정
    >
      {/* 배경 레이어 */}
      <Gradient
        variant="background"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 opacity-50"
        pointerEvents="none"
      />
      {/* 콘텐츠 */}
      {children}
    </SafeAreaView>
  );
}

export default RootBackground;
