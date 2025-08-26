import { View, Text } from "react-native";
import { MoodEntryType } from "../services/moodStorage";
import { MOOD_OPTIONS, moodColors } from "../data/mood.data";
import { useMemo } from "react";
import { cn } from "@utils/cn";
import { useTheme } from "@providers/ThemeProvider";
import MoodImage from "./MoodImage";
import { getCounts } from "../utils/moodStats";

type MoodVerticalBarsPropsType = {
  moodEntries: MoodEntryType[];
  height?: number; // 막대 트랙 높이
  barWidth?: number; // 막대 너비
  minFill?: number; // 값이 0이어도 최소 표시 높이
};

export default function MoodVerticalBars({
  moodEntries,
  height = 120,
  barWidth = 18,
  minFill = 0,
}: MoodVerticalBarsPropsType) {
  const { theme } = useTheme();
  const moodIds = MOOD_OPTIONS.map((o) => o.id);

  const moodCounts = useMemo(() => getCounts(moodEntries), [moodEntries]);
  const maxCount = useMemo(
    () => Math.max(1, ...Object.values(moodCounts)),
    [moodCounts]
  );

  return (
    <View
      className={cn(
        "rounded-2xl p-4 bg-primary-50",
        theme === "light" ? "elev-center-low" : "elev-center-low-dark"
      )}
    >
      <View className="flex-row items-end justify-between">
        {moodIds.map((id) => {
          const count = moodCounts[id] ?? 0;
          const ratio = count / maxCount; // 0~1
          const fillH = Math.max(minFill, Math.round(height * ratio));
          const color = moodColors[id as keyof typeof moodColors].DEFAULT;

          return (
            <View key={id} className="items-center flex-1 gap-3">
              {/* Image */}
              <MoodImage name={id as any} width={38} height={38} />

              {/* Track */}
              <View
                className="bg-background justify-end overflow-hidden"
                style={{
                  width: barWidth,
                  height,
                  borderRadius: barWidth,
                }}
              >
                {/* Fill */}
                <View
                  style={{
                    height: fillH,
                    backgroundColor: color,
                    borderRadius: barWidth,
                  }}
                />
              </View>

              {/* Count */}
              <Text className="text-xs text-neutral-600">{count}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
