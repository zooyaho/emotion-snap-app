import { MoodIdType } from "../types/mood.type";

export const MOOD_OPTIONS = [
  { id: "angry", label: "angry" },
  { id: "upset", label: "upset" },
  { id: "sad", label: "sad" },
  { id: "good", label: "good" },
  { id: "happy", label: "happy" },
  { id: "spectacular", label: "spectacular" },
] as const;

export const moodColors = {
  angry: { DEFAULT: "#FF843E", text: "#913704" },
  upset: { DEFAULT: "#8CA4EE", text: "#363F59" },
  sad: { DEFAULT: "#A1E7EB", text: "#2A696E" },
  good: { DEFAULT: "#FDDD6F", text: "#635522" },
  happy: { DEFAULT: "#DFEBFF", text: "#5C6CA1" },
  spectacular: { DEFAULT: "#FFA7BC", text: "#66424B" },
  positive: { DEFAULT: "#FFA7BC", text: "#66424B" },
  negative: { DEFAULT: "#8CA4EE", text: "#363F59" },
};

// 낮을수록 부정, 높을수록 긍정
export const MOOD_SCORE: Record<MoodIdType, number> = {
  angry: -2,
  upset: -1,
  sad: -1,
  good: 1,
  happy: 2,
  spectacular: 3,
} as const;
