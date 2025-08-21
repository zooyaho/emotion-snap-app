import { cn } from "@utils/cn";
import { Pressable, Text, View } from "react-native";
import { MOOD_OPTIONS } from "../data/mood.data";
import { MoodIdType } from "../types/mood.type";
import MoodImage from "./MoodImage";
import { getMoodHex } from "../utils/moodColors";

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
  return (
    <View
      className={cn(
        "rounded-2xl bg-background p-4 elev-center-low gap-2 h-fit",
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
                className={cn(
                  "text-xs font-semibold",
                  selected ? "text-primary-600" : "text-neutral-600"
                )}
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
