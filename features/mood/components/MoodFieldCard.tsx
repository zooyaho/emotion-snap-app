import { AppTextarea } from "@components/common/AppTextarea";
import { cn } from "@utils/cn";
import { Text, View } from "react-native";
import { MOOD_TEXT_MAX_LENGTH } from "../schemas/mood.schema";
import { useTheme } from "@providers/ThemeProvider";

type MoodFieldCardPropsType = {
  title?: string;
  containerClassName?: string;
} & Omit<React.ComponentProps<typeof AppTextarea>, "">;

export default function MoodFieldCard({
  title = "감정을 자세히 기록해 보세요",
  containerClassName,
  ...rest
}: MoodFieldCardPropsType) {
  const { theme } = useTheme();
  return (
    <View
      className={cn(
        "rounded-2xl bg-background p-4 gap-2 h-fit",
        theme === "light" ? "elev-center-low" : "elev-center-low-dark",
        containerClassName
      )}
    >
      <Text className="text-center text-h5 mb-2 text-neutral-600">{title}</Text>
      <AppTextarea rows={8} maxLength={MOOD_TEXT_MAX_LENGTH} {...rest} />
    </View>
  );
}
