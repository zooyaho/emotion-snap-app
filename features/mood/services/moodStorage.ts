import AsyncStorage from "@react-native-async-storage/async-storage";
import type { MoodIdType } from "@features/mood/types/mood.type";
import { ZodUUID } from "zod";

const KEY = "mood:entries";

export type MoodEntryType = {
  id: string; // uuid
  moodId: MoodIdType;
  note: string;
  createdAt: number;
};

export async function getMoodEntries(): Promise<MoodEntryType[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as MoodEntryType[];
  } catch {
    return [];
  }
}

export async function addMoodEntry(entry: MoodEntryType): Promise<void> {
  const list = await getMoodEntries();
  list.unshift(entry); // 최근 순
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function updateMoodEntry(
  id: string,
  patch: Partial<MoodEntryType>
) {
  const list = await getMoodEntries();
  const next = list.map((e) => (e.id === id ? { ...e, ...patch } : e));
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export async function removeMoodEntry(id: string) {
  const list = await getMoodEntries();
  const next = list.filter((e) => e.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export async function clearAllMoodEntries() {
  await AsyncStorage.removeItem(KEY);
}
