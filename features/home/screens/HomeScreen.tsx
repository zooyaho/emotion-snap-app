import LoadingIndicator from "@components/common/LoadingIndicator";
import MoodNoteCard from "@features/mood/components/MoodNoteCard";
import MoodVerticalBars from "@features/mood/components/MoodVerticalBars";
import { removeMoodEntry } from "@features/mood/services/moodStorage";
import { usePeriodEntries } from "@hooks/usePeriodEntries";
import { cn } from "@utils/cn";
import { format } from "date-fns";
import { useMemo } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import MoodImage from "../../mood/components/MoodImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function HomeScreen() {
  const queryClient = useQueryClient();
  const { noteEntries, isInitialLoading, queryKey } = usePeriodEntries("day", {
    resetOnFocus: false,
  });

  const dateLabel = useMemo(() => {
    const today = new Date();
    return format(today, "M월 d일");
  }, []);

  /** 기록 삭제 mutation */
  const deleteMutation = useMutation({
    mutationFn: (id: string) => removeMoodEntry(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      Alert.alert("삭제 실패", "기록을 삭제하지 못했습니다.");
    },
  });

  /** 기록 삭제 핸들러 */
  const handleDeleteNote = (id: string) => deleteMutation.mutate(id);

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
        <MoodVerticalBars moodEntries={noteEntries} />
      </View>

      {/* 기록 리스트 */}
      <View className="mt-6 gap-4">
        {isInitialLoading ? (
          <View className="mt-16 items-center justify-center">
            <LoadingIndicator />
          </View>
        ) : noteEntries.length === 0 ? (
          <View className="flex-row mt-16 items-center justify-center">
            <Text className="text-md text-center text-neutral-600">
              순간의 감정을 기록해 보세요
            </Text>
            <MoodImage name="spectacular" height={32} width={32} />
          </View>
        ) : (
          noteEntries.map((note) => (
            <MoodNoteCard
              key={note.id}
              id={note.id}
              moodId={note.moodId}
              createdDate={note.createdAt}
              content={note.note}
              onDeletePress={handleDeleteNote}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}
