import { cn } from "@utils/cn";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton, type VariantType, type SizeType } from "./AppButton";
import { useTheme } from "@providers/ThemeProvider";

type BottomButtonPropsType = {
  title: string;
  buttonVariant?: VariantType;
  buttonSize?: SizeType;
  onPress: () => void;
  disabled?: boolean;
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
      style={{ paddingBottom: insets.bottom }}
      className={cn(
        "px-4 py-4 bg-neutral-50 elev-up-low",
        theme === "dark" && "elev-up-low-dark"
      )}
    >
      <AppButton title={title} size="md" variant="primary" {...rest} />
    </View>
  );
}
