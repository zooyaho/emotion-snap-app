import BottomButton from "@components/common/BottomButton";
import MoodPickerCard from "@features/mood/components/MoodPickerCard";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { MoodIdType } from "../types/mood.type";
import MoodNoteCard from "../components/MoodNoteCard";
import useAddMood from "../hooks/useAddMood";
import MoodActionCompleteModal from "../components/MoodActionCompleteModal";

export function MoodAddScreen() {
  const {
    successModalController,
    mood,
    setMood,
    note,
    setNote,
    isValid,
    submit,
    isSubmitting,
  } = useAddMood();

  const handleMoodPick = (pickedMoodId: MoodIdType) => {
    // console.log("pickedMoodId", pickedMoodId);
    setMood(pickedMoodId);
  };

  const handleNoteChange = (text: string) => {
    // console.log("text", text);
    setNote(text);
  };

  return (
    <>
      <KeyboardAvoidingView behavior={"position"} className="flex-1">
        <ScrollView contentContainerClassName="pb-24 p-6">
          <View className="flex-1 gap-4">
            <MoodPickerCard value={mood} onChange={handleMoodPick} />
            <MoodNoteCard value={note} onChangeText={handleNoteChange} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* <AppButton
        title="Modal Show"
        variant="secondary"
        iconName="chevron-forward"
        iconPosition="left"
        // isLoading
        onPress={() => successModalController.open()}
      /> */}

      <BottomButton
        title="기록"
        onPress={submit}
        disabled={!isValid}
        isLoading={isSubmitting}
      />

      {/* 기록 성공 시 활성화 모달 */}
      {mood && (
        <MoodActionCompleteModal
          controller={successModalController}
          moodId={mood}
          desc="기록 완료!"
          handleConfirmPress={() => {
            successModalController.close();
            // router.back();
          }}
        />
      )}
    </>
  );
}
