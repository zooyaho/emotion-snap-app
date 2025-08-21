import { moodColors } from "../data/mood.data";

export type MoodIdType =
  | "angry"
  | "upset"
  | "sad"
  | "good"
  | "happy"
  | "spectacular";

export type MoodOptionType = {
  id: MoodIdType;
  label: string;
  color?: string; // 테마/스타일 포인트
};

export type MoodVariantType = keyof (typeof moodColors)[MoodIdType]; // "DEFAULT" | "text"
