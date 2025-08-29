import LoadingIndicator from "@components/common/LoadingIndicator";
import MoodNoteCard from "@features/mood/components/MoodNoteCard";
import MoodVerticalBars from "@features/mood/components/MoodVerticalBars";
import {
  getTodayMoodEntries,
  MoodEntryType,
  removeMoodEntry,
} from "@features/mood/services/moodStorage";
import { cn } from "@utils/cn";
import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import MoodImage from "../../mood/components/MoodImage";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const [todayNoteEntries, setTodayNoteEntries] = useState<MoodEntryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadToday = useCallback(async () => {
    setIsLoading(true);
    const list = await getTodayMoodEntries();
    setTodayNoteEntries(list);
    setIsLoading(false);
  }, []);

  // 삭제 핸들러
  const handleDelete = async (id: string) => {
    await removeMoodEntry(id);
    await loadToday();
  };

  const dateLabel = useMemo(() => {
    const today = new Date();
    return format(today, "M월 d일");
  }, []);

  useFocusEffect(
    // 화면이 다시 포커스될 때마다 재조회
    useCallback(() => {
      loadToday();
    }, [loadToday])
  );

  return (
    <ScrollView
      className={cn("flex-1 px-4 pt-6")}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Today */}
      <Text className="text-h3 text-neutral-600">{dateLabel}</Text>

      {/* 감정 분포 */}
      <View className="mt-4 gap-3">
        <Text className="text-base text-neutral-600">오늘의 감정 분포</Text>
        <MoodVerticalBars moodEntries={todayNoteEntries} />
      </View>

      {/* 기록 리스트 */}
      <View className="mt-6 gap-4">
        {isLoading ? (
          <View className="mt-16 items-center justify-center">
            <LoadingIndicator />
          </View>
        ) : todayNoteEntries.length === 0 ? (
          <View className="flex-row mt-16 items-center justify-center">
            <Text className="text-md text-center text-neutral-600">
              순간의 감정을 기록하세요
            </Text>
            <MoodImage name="spectacular" height={32} width={32} />
          </View>
        ) : (
          todayNoteEntries.map((note) => (
            <MoodNoteCard
              key={note.id}
              id={note.id}
              moodId={note.moodId}
              createdDate={note.createdAt}
              content={note.note}
              onDeletePress={handleDelete}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}
