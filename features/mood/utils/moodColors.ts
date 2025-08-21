import { MoodIdType, MoodVariantType } from "../types/mood.type";
import { moodColors } from "../data/mood.data";

export function getMoodHex(
  mood: MoodIdType,
  variant: MoodVariantType = "DEFAULT"
) {
  return moodColors[mood][variant];
}
