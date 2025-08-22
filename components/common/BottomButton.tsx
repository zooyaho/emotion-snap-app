import { cn } from "@utils/cn";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton, type VariantType, type SizeType } from "./AppButton";
import { useTheme } from "@providers/ThemeProvider";
import { BOTTOM_BAR_HEIGHT } from "@constants/styles.constant";

type BottomButtonPropsType = {
  title: string;
  buttonVariant?: VariantType;
  buttonSize?: SizeType;
} & Omit<React.ComponentProps<typeof AppButton>, "size" | "variant">;

export default function BottomButton({
  title,
  buttonSize = "md",
  buttonVariant = "primary",
  ...rest
}: BottomButtonPropsType) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View
      style={{
        paddingBottom: insets.bottom,
        height: insets.bottom + BOTTOM_BAR_HEIGHT,
      }}
      className={cn(
        "px-4 py-4 bg-background elev-up-low",
        theme === "dark" && "elev-up-low-dark"
      )}
    >
      {/* <AppButton title="Button" variant="outline" isLoading size="sm" /> */}
      <AppButton title={title} size="md" variant="primary" {...rest} />
    </View>
  );
}
