import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { View, Text, ViewStyle, StyleProp } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@providers/ThemeProvider";
import { cn } from "@utils/cn";

export type AppBottomSheetRef = {
  present: () => void;
  dismiss: () => void;
};

type AppBottomSheetPropsType = {
  /** 상단 타이틀(선택) */
  title?: string;
  /** ['40%', '80%'] 또는 숫자 px */
  snapPoints?: Array<string | number>;
  /** 시트 닫기 제스처 등 옵션 */
  enableDynamicSizing?: boolean;
  enableOverDrag?: boolean;
  enablePanDownToClose?: boolean;
  /** 배경 색상 커스텀(선택) */
  backgroundLight?: string;
  backgroundDark?: string;
  /** 시트 본문 */
  children?: ReactNode;
  /** 시트 열릴 초기 index (기본 0) */
  index?: number;
  /** 시트가 닫힐 때 콜백 */
  onDismiss?: () => void;
  /** 핸들 인디케이터 색상 */
  handleIndicatorColor?: string;
  /** className to root content container (for Tailwind / NativeWind) */
  contentClassName?: string;
  /** content paddingTop 등 주고 싶을 때 */
  contentStyle?: StyleProp<ViewStyle>;
};

const defaultSnap = ["40%"];

const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    pressBehavior="close"
  />
);

export const AppBottomSheet = forwardRef(function AppBottomSheet(
  {
    title,
    snapPoints = defaultSnap,
    enableDynamicSizing = false, // 동적 사이징 끄기
    enableOverDrag = false, // 위로 더 끌어올리는 과-드래그 방지
    enablePanDownToClose = true, // 아래로 끌어내리면 닫힘
    backgroundLight = "#FAF9F6",
    backgroundDark = "#141417",
    children,
    index = 0,
    onDismiss,
    handleIndicatorColor = "#ccc",
    contentClassName,
    contentStyle,
  }: AppBottomSheetPropsType,
  ref: ForwardedRef<AppBottomSheetRef>
) {
  const { theme } = useTheme();
  const innerRef = useRef<BottomSheetModal>(null);

  const bgColor = theme === "light" ? backgroundLight : backgroundDark;

  const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  useImperativeHandle(ref, () => ({
    present: () => innerRef.current?.present(),
    dismiss: () => innerRef.current?.dismiss(),
  }));

  return (
    <BottomSheetModal
      ref={innerRef}
      index={index}
      snapPoints={memoSnapPoints}
      enableDynamicSizing={enableDynamicSizing}
      enablePanDownToClose={enablePanDownToClose}
      enableOverDrag={enableOverDrag}
      keyboardBehavior="interactive"
      onDismiss={onDismiss}
      backgroundStyle={{
        backgroundColor: bgColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      handleIndicatorStyle={{ backgroundColor: handleIndicatorColor }}
      backdropComponent={Backdrop}
    >
      <View className={cn("px-4", contentClassName)} style={contentStyle}>
        {/* Header */}
        {title && (
          <View className="items-center pb-3 mb-2 border-b border-neutral-100">
            <Text className="text-md text-neutral-600">{title}</Text>
          </View>
        )}

        {/* Content */}
        {/* children은 Scroll/FlatList 서브컴포넌트로 넣는 것을 권장 */}
        {children}
      </View>
    </BottomSheetModal>
  );
});

/** Scroll 버전: 내부 여백/바텀 인셋 패딩 자동 처리 */
export function SheetScroll({
  children,
  className,
  contentPaddingBottomExtra = 20,
  contentContainerStyle,
}: {
  children: ReactNode;
  className?: string;
  /** insets.bottom + extra */
  contentPaddingBottomExtra?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
}) {
  const insets = useSafeAreaInsets();
  return (
    <BottomSheetScrollView
      className={cn(className)}
      contentContainerStyle={[
        { paddingBottom: insets.bottom + contentPaddingBottomExtra },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </BottomSheetScrollView>
  );
}
