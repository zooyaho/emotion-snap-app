import BottomButton from "@components/common/BottomButton";
import MoodPickerCard from "@features/mood/components/MoodPickerCard";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { MoodIdType } from "../types/mood.type";
import MoodFieldCard from "../components/MoodFieldCard";
import useEditMood from "../hooks/useEditMood";
import MoodAddCompleteModal from "../components/MoodAddCompleteModal";
import { router } from "expo-router";

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
  } = useEditMood(moodId);

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
