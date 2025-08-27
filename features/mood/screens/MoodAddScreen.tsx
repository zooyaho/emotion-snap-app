import BottomButton from "@components/common/BottomButton";
import MoodPickerCard from "@features/mood/components/MoodPickerCard";
import { router } from "expo-router";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import MoodAddCompleteModal from "../components/MoodAddCompleteModal";
import MoodFieldCard from "../components/MoodFieldCard";
import useMood from "../hooks/useMood";
import { MoodIdType } from "../types/mood.type";

export function MoodAddScreen() {
  const {
    successModalController,
    moodValue,
    setMoodValue,
    noteValue,
    setNoteValue,
    isValid,
    submit,
    isSubmitting,
  } = useMood("add");

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

  return (
    <>
      <KeyboardAvoidingView behavior={"position"} className="flex-1">
        <ScrollView contentContainerClassName="pb-24 p-6">
          <View className="flex-1 gap-4">
            <MoodPickerCard value={moodValue} onChange={handleMoodPick} />
            <MoodFieldCard value={noteValue} onChangeText={handleNoteChange} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomButton
        title="기록"
        onPress={submit}
        disabled={!isValid}
        isLoading={isSubmitting}
      />

      {/* 기록 성공 시 활성화 모달 */}
      {moodValue && (
        <MoodAddCompleteModal
          controller={successModalController}
          moodId={moodValue}
          desc="기록 완료!"
          handleConfirmPress={handleConfirm}
        />
      )}
    </>
  );
}
