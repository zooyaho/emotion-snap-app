import { Asset } from "expo-asset";
import type { ImageSourcePropType } from "react-native";
import type { MoodIdType } from "../types/mood";

export const MOOD_IMAGES = {
  angry: require("@assets/images/moods/angry.png"),
  upset: require("@assets/images/moods/upset.png"),
  sad: require("@assets/images/moods/sad.png"),
  good: require("@assets/images/moods/good.png"),
  happy: require("@assets/images/moods/happy.png"),
  spectacular: require("@assets/images/moods/spectacular.png"),
} as const satisfies Record<MoodIdType, ImageSourcePropType>;

export async function preloadMoodImages() {
  // 스플래시에서 호출하면 깜빡임 감소
  await Asset.loadAsync(Object.values(MOOD_IMAGES));
}
