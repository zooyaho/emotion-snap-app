import { MOOD_OPTIONS, moodColors } from "../data/mood.data";

export type MoodOptionType = {
  id: MoodIdType;
  label: string;
  color?: string; // 테마/스타일 포인트
};

export type MoodIdType = (typeof MOOD_OPTIONS)[number]["id"];

export type MoodVariantType = keyof (typeof moodColors)[MoodIdType]; // "DEFAULT" | "text"
