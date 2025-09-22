import BottomButton from "@components/common/BottomButton";
import MoodPickerCard from "@features/mood/components/MoodPickerCard";
import { router } from "expo-router";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import MoodAddCompleteModal from "../components/MoodAddCompleteModal";
import MoodFieldCard from "../components/MoodFieldCard";
import useMoodEntryForm from "../hooks/useMoodEntryForm";
import { MoodIdType } from "../types/mood.type";
import LoadingIndicator from "@components/common/LoadingIndicator";
import { useEffect } from "react";

type MoodEditScreenPropsType = {
  moodId?: string;
};

export default function MoodEditScreen({ moodId }: MoodEditScreenPropsType) {
  const {
    successModalController,
    moodValue,
    setMoodValue,
    noteValue,
    setNoteValue,
    isValid,
    submit,
    isSubmitting,
    isInitialDataLoading,
    isNotFound,
  } = useMoodEntryForm("edit", moodId);

  const handleMoodPick = (pickedMoodId: MoodIdType) => {
    // console.log("pickedMoodId", pickedMoodId);
    setMoodValue(pickedMoodId);
  };

  const handleNoteChange = (text: string) => {
    // console.log("text", text);
    setNoteValue(text);
  };

  const handleConfirm = async () => {
    await successModalController.closeAsync();
    router.back();
  };

  useEffect(() => {
    if (isNotFound) router.back();
  }, [isNotFound]);

  return (
    <>
      {isInitialDataLoading ? (
        <View pointerEvents="none" className="flex-center">
          <LoadingIndicator color="primary" width={40} height={40} />
        </View>
      ) : (
        <KeyboardAvoidingView behavior={"position"} className="flex-1">
          <ScrollView contentContainerClassName="pb-24 p-6">
            <View className="flex-1 gap-4">
              <MoodPickerCard value={moodValue} onChange={handleMoodPick} />
              <MoodFieldCard
                value={noteValue}
                onChangeText={handleNoteChange}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

      <BottomButton
        title="수정"
        onPress={submit}
        disabled={!isValid}
        isLoading={isSubmitting}
      />

      {/* 수정 성공 시 활성화 모달 */}
      {moodValue && (
        <MoodAddCompleteModal
          controller={successModalController}
          moodId={moodValue}
          desc="수정 완료!"
          handleConfirmPress={handleConfirm}
        />
      )}
    </>
  );
}
