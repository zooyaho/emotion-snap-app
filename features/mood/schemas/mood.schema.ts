import z from "zod";
import { MOOD_OPTIONS } from "../data/mood.data";
import { MoodIdType } from "../types/mood.type";

export const MOOD_TEXT_MAX_LENGTH = 500;

const moodEnum = z.enum(
  MOOD_OPTIONS.map((m) => m.id) as [MoodIdType, ...MoodIdType[]]
);

export const moodFormSchema = z.object({
  moodValue: z
    .union([moodEnum, z.literal("")])
    .refine((v): v is MoodIdType => v !== "", {
      message: "감정을 선택해주세요",
    }),
  noteValue: z.string().trim().min(1, "").max(200),
});

export type MoodFormValuesType = {
  moodValue: MoodIdType | ""; // "" = 기본(미선택)
  noteValue: string;
};
