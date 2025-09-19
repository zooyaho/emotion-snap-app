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

/** 감정 기록 타입 정의 */
export type MoodEntryType = {
  id: string; // uuid
  moodId: MoodIdType;
  note: string;
  createdAt: number;
};

/** 조회 옵션 타입 */
type MoodQueryType =
  | { range: "all" }
  | { range: "day"; date?: Date | number }
  | { range: "month"; date?: Date | number }
  | { range: "year"; date?: Date | number }
  | { range: "custom"; from: Date | number; to: Date | number };

/**
 * 전체 감정 기록 리스트 로드
 * @returns 모든 감정 기록 배열
 */
async function getMoodAllEntry(): Promise<MoodEntryType[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as MoodEntryType[];
  } catch {
    return [];
  }
}

/**
 * 범위에 맞는 감정 기록 조회
 * @param query 조회 범위 (전체, 일간, 월간, 연간, 커스텀)
 * @returns 범위에 해당하는 감정 기록 배열
 */
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

/**
 * 오늘의 감정 기록 조회
 * @returns 오늘 작성된 감정 기록 배열
 */
export const getTodayMoodEntries = () => getMoodEntries({ range: "day" });

/**
 * ID로 특정 감정 기록 조회
 * @param id 찾고 싶은 기록의 ID
 * @returns 해당 감정 기록 (없으면 undefined)
 */
export async function getMoodEntryById(
  id: string
): Promise<MoodEntryType | undefined> {
  const list = await getMoodEntries();
  return list.find((e) => e.id === id);
}

/**
 * 새로운 감정 기록 추가
 * @param entry 감정 기록 (id 제외)
 */
export async function addMoodEntry(
  entry: Omit<MoodEntryType, "id">
): Promise<void> {
  const list = await getMoodEntries();
  const addData = { ...entry } as MoodEntryType;
  addData.id = uuidv4();
  list.unshift(addData); // 최근 순
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

/**
 * 감정 기록 수정
 * @param id 수정할 기록의 ID
 * @param patch 수정할 필드 (부분 업데이트 가능)
 */
export async function updateMoodEntry(
  id: string,
  patchValues: Omit<MoodEntryType, "id" | "createdAt">
) {
  const prevList = await getMoodEntries();
  const updatedList = prevList.map((e) =>
    e.id === id ? { ...e, ...patchValues } : e
  );
  await AsyncStorage.setItem(KEY, JSON.stringify(updatedList));
}

/**
 * 감정 기록 삭제
 * @param id 삭제할 기록의 ID
 */
export async function removeMoodEntry(id: string) {
  const list = await getMoodEntries();
  const next = list.filter((e) => e.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

/**
 * 모든 감정 기록 삭제
 */
export async function clearAllMoodEntries() {
  await AsyncStorage.removeItem(KEY);
}
