import { MOOD_OPTIONS } from "../data/mood.data";
import { MoodEntryType } from "../services/moodStorage";
import { MoodIdType } from "../types/mood.type";

const moodIds = MOOD_OPTIONS.map((o) => o.id);

export function getCounts(moodEntries: MoodEntryType[]) {
  const counts = Object.fromEntries(moodIds.map((id) => [id, 0])) as Record<
    string,
    number
  >; // {"angry": 0, "good": 0, "happy": 0, "sad": 0, "spectacular": 0, "upset": 0}

  for (const mood of moodEntries) {
    if (counts[mood.moodId] !== undefined) counts[mood.moodId] += 1;
  }

  return counts;
}

// export function getPercents(entries: MoodEntryType[]) {
//   const counts = getCounts(entries);
//   const total = Math.max(1, entries.length);

//   return Object.fromEntries(
//     MOODS.map((m) => [m, Math.round((counts[m] / total) * 100)])
//   ) as Record<MoodIdType, number>;
// }
