import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { MoodIdType } from "@features/mood/types/mood.type";
import {
  startEndOfDay,
  startEndOfMonth,
  startEndOfYear,
  toMs,
} from "@utils/dateRange";

const KEY = "mood:entries";

export type MoodEntryType = {
  id: string; // uuid
  moodId: MoodIdType;
  note: string;
  createdAt: number;
};

/** 조회 옵션 */
type MoodQueryType =
  | { range: "all" }
  | { range: "day"; date?: Date | number }
  | { range: "month"; date?: Date | number }
  | { range: "year"; date?: Date | number }
  | { range: "custom"; from: Date | number; to: Date | number };

/** 전체 Mood Note List 로드 */
async function getMoodAllEntry(): Promise<MoodEntryType[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as MoodEntryType[];
  } catch {
    return [];
  }
}

/** 범위 조회 지원 */
export const getMoodEntries = async (
  query: MoodQueryType = { range: "all" }
): Promise<MoodEntryType[]> => {
  const all = await getMoodAllEntry();
  switch (query.range) {
    case "all":
      return all;

    case "day": {
      const { start, end } = startEndOfDay(
        query.date ? new Date(toMs(query.date)) : new Date()
      );
      return all.filter((e) => e.createdAt >= start && e.createdAt <= end);
    }

    case "month": {
      const { start, end } = startEndOfMonth(
        query.date ? new Date(toMs(query.date)) : new Date()
      );
      return all.filter((e) => e.createdAt >= start && e.createdAt <= end);
    }

    case "year": {
      const { start, end } = startEndOfYear(
        query.date ? new Date(toMs(query.date)) : new Date()
      );
      return all.filter((e) => e.createdAt >= start && e.createdAt <= end);
    }

    case "custom": {
      const start = toMs(query.from);
      const end = toMs(query.to);
      return all.filter((e) => e.createdAt >= start && e.createdAt <= end);
    }
  }
};

/** 편의 함수들 */
export const getTodayMoodEntries = () => getMoodEntries({ range: "day" });
export const getMonthMoodEntries = (date?: Date | number) =>
  getMoodEntries({ range: "month", date });
export const getYearMoodEntries = (date?: Date | number) =>
  getMoodEntries({ range: "year", date });

export async function addMoodEntry(
  entry: Omit<MoodEntryType, "id">
): Promise<void> {
  const list = await getMoodEntries();
  const addData = { ...entry } as MoodEntryType;
  addData.id = uuidv4();
  list.unshift(addData); // 최근 순
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
