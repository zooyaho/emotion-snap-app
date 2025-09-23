export type RangeType = "day" | "month" | "year";

export const queryKeys = {
  mood: {
    all: ["mood"] as const,
    entry: (id: string) => ["moodEntry", id] as const,
    entries: (range: RangeType, date: string) =>
      ["entries", range, date] as const,
  },
};
