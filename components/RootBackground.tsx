import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Gradient from "@components/common/Gradient";

interface BackgroundViewPropsType {
  children: React.ReactNode;
  isInsetDisabled?: boolean; // 필요시 안전영역 비활성화 옵션
}

function RootBackground({
  children,
  isInsetDisabled,
}: BackgroundViewPropsType) {
  const Container = isInsetDisabled ? View : SafeAreaView;

  return (
    <Container className="flex-1 bg-background">
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
    </Container>
  );
}

export default RootBackground;
