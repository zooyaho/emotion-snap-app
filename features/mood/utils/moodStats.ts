import {
  MOOD_NEGATIVE_SET,
  MOOD_OPTIONS,
  MOOD_POSITIVE_SET,
} from "../data/mood.data";
import { MoodEntryType } from "../services/moodStorage";
import { MoodIdType } from "../types/mood.type";

const moodIds = MOOD_OPTIONS.map((o) => o.id);

/**
 * 감정 기록 배열에서 `moodId`별 개수를 집계해 반환합니다.
 * - `MOOD_OPTIONS`의 모든 id를 0으로 초기화한 뒤 카운트합니다.
 * - 목록에 없는 id는 무시합니다.
 *
 * @param {MoodEntryType[]} moodEntries 집계할 감정 기록
 * @returns {Record<string, number>} key: moodId, value: 개수
 */
export function getCountMoodEntriesById(moodEntries: MoodEntryType[]) {
  const counts = Object.fromEntries(moodIds.map((id) => [id, 0])) as Record<
    string,
    number
  >; // {"angry": 0, "good": 0, "happy": 0, "sad": 0, "spectacular": 0, "upset": 0}

  for (const mood of moodEntries) {
    if (counts[mood.moodId] !== undefined) counts[mood.moodId] += 1;
  }

  return counts;
}

/**
 * 긍/부정 총합과 비율(%)을 계산합니다.
 * - counts의 key 중 POSITIVE/NEGATIVE 세트에 속한 값만 합산합니다.
 *
 * @param {Record<string, number>} counts 감정별 개수 맵
 * @returns {{ positive: number; negative: number; total: number; posPct: number; negPct: number }}
 *  positive/negative/total 합계와 각 비율(%)을 반환
 */
export function moodChartPosNegData(counts: Record<string, number>) {
  let positive = 0;
  let negative = 0;

  for (const [id, v] of Object.entries(counts)) {
    if (MOOD_POSITIVE_SET.has(id as any)) positive += v;
    else if (MOOD_NEGATIVE_SET.has(id as any)) negative += v;
  }

  const total = positive + negative;
  const posPct = total === 0 ? 0 : Math.round((positive / total) * 100);
  const negPct = total === 0 ? 0 : 100 - posPct;

  return { positive, negative, total, posPct, negPct };
}

/**
 * 감정 엔트리 목록을 요약합니다.
 * - 엔트리 → 감정별 counts 생성 후, 긍/부정 지표까지 합쳐 반환합니다.
 *
 * @param {MoodEntryType[]} entries 감정 엔트리 배열
 * @returns {{
 *   counts: Record<string, number>;
 *   positive: number; negative: number; total: number; posPct: number; negPct: number;
 * }}
 *  counts와 긍/부정 합계/비율을 포함한 요약 객체
 */
export function buildMoodChartPosNegData(entries: MoodEntryType[]) {
  const counts = getCountMoodEntriesById(entries);
  const { positive, negative, total, posPct, negPct } =
    moodChartPosNegData(counts);
  return { counts, positive, negative, total, posPct, negPct };
}
