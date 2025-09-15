import { ThemedIonicon } from "@components/common/ThemedIonicon";
import type Ionicons from "@expo/vector-icons/Ionicons";
import { cn } from "@utils/cn";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  Text,
  ViewStyle,
} from "react-native";
import LoadingIndicator from "./LoadingIndicator";

export type VariantType = "primary" | "secondary" | "outline";
export type SizeType = "md" | "sm" | "xs";
export type IconPositionType = "left" | "right";

type AppButtonPropsType = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: VariantType;
  size?: SizeType;
  disabled?: boolean;
  style?: ViewStyle;
  /**
   * Ionicons 이름 그대로 전달
   * 예) "close", "add"
   */
  iconName?: keyof typeof Ionicons.glyphMap;
  iconPosition?: IconPositionType;
  /** 아이콘과 텍스트 간격(px) */
  gap?: number;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<PressableProps, "onPress" | "style" | "children" | "disabled">;

export function AppButton({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled,
  style,
  iconName,
  iconPosition = "right",
  gap = 6,
  isLoading,
  className,
  children,
}: AppButtonPropsType) {
  // 사이즈별 높이/패딩/폰트
  const sizeCls = {
    md: {
      container: "h-12 px-5 rounded-xl",
      text: "text-md",
      icon: 18,
    },
    sm: {
      container: "h-10 px-4 rounded-lg",
      text: "text-sm",
      icon: 16,
    },
    xs: {
      container: "h-8 px-3 rounded-md",
      text: "text-xs",
      icon: 14,
    },
  }[size];

  // Variant별 컨테이너/텍스트 스타일 (pressed/disabled 포함)
  // TODO :: pressed 적용 안되는 이슈 해결 필요
  const variantContainerCls = {
    primary: "bg-primary-500 pressed:bg-primary-600 disabled:bg-neutral-200",
    secondary: "bg-primary-50 pressed:bg-primary-100 disabled:bg-neutral-100",
    outline:
      "bg-transparent border border-primary-500 pressed:bg-primary-50 disabled:border-neutral-300 disabled:bg-neutral-100",
  }[variant];

  const variantTextCls = {
    primary: "text-neutral-50 group-disabled:text-neutral-400",
    secondary: "text-primary-500 group-disabled:text-neutral-400",
    outline: "text-primary-500 group-disabled:text-neutral-400",
  }[variant];

  // 아이콘 색상 토큰(텍스트와 맞춤)
  const iconColorToken =
    variant === "primary"
      ? disabled
        ? "neutral-400"
        : "neutral-50"
      : disabled
        ? "neutral-400"
        : "primary-500";

  // 아이콘 사이 간격
  const gapStyle = { gap };

  const handlePress = (event: GestureResponderEvent) => {
    if (isLoading) return;
    onPress?.(event);
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      className={cn(
        "flex-1 group flex-row items-center justify-center",
        sizeCls.container,
        variantContainerCls,
        "disabled:opacity-80",
        className
      )}
      style={[gapStyle, style]}
      // android_ripple={{ color: "rgba(0,0,0,0.06)", borderless: false }}
    >
      {isLoading ? (
        <LoadingIndicator
          color={variant === "primary" ? "background" : "primary"}
          width={sizeCls.icon + 4}
          height={sizeCls.icon + 4}
        />
      ) : (
        <>
          {iconName && iconPosition === "left" && (
            <ThemedIonicon
              name={iconName}
              size={sizeCls.icon}
              colorToken={iconColorToken as any}
            />
          )}

          <Text
            className={cn("text-center", sizeCls.text, variantTextCls)}
            numberOfLines={1}
          >
            {title}
          </Text>

          {iconName && iconPosition === "right" && (
            <ThemedIonicon
              name={iconName}
              size={sizeCls.icon}
              colorToken={iconColorToken as any}
            />
          )}
        </>
      )}
      {children}
    </Pressable>
  );
}
