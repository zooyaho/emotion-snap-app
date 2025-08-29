import { cn } from "@utils/cn";
import { Pressable, Text, View } from "react-native";
import { MOOD_OPTIONS } from "../data/mood.data";
import { MoodIdType } from "../types/mood.type";
import MoodImage from "./MoodImage";
import { getMoodHex } from "../utils/moodColors";
import { useTheme } from "@providers/ThemeProvider";

type MoodPickerCardPropsType = {
  value?: MoodIdType | null;
  onChange: (moodId: MoodIdType) => void;
  disabled?: boolean;
  title?: string;
  className?: string;
};

export default function MoodPickerCard({
  value,
  onChange,
  disabled,
  title = "감정을 골라보세요",
  className,
}: MoodPickerCardPropsType) {
  const { theme } = useTheme();
  return (
    <View
      className={cn(
        "rounded-2xl bg-background p-4  gap-2 h-fit",
        theme === "light" ? "elev-center-low" : "elev-center-low-dark",
        className
      )}
    >
      <Text className="text-center text-h5 mb-2 text-neutral-600">{title}</Text>

      <View className="flex-row flex-wrap justify-between items-center h-fit">
        {MOOD_OPTIONS.map((opt) => {
          const { id, label } = opt;
          const selected = value === opt.id;

          return (
            <Pressable
              key={id}
              disabled={disabled}
              onPress={() => onChange(id)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              className={cn(
                "w-[30%] aspect-square items-center justify-center",
                !selected && "opacity-50"
              )}
            >
              <Text
                className={cn("text-xs font-semibold")}
                style={{ color: getMoodHex(id, "text") }}
                numberOfLines={1}
              >
                {label}
              </Text>
              <MoodImage
                name={id}
                width={selected ? 80 : 50}
                resizeMode="contain"
                accessibilityLabel={id}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
