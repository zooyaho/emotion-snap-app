import BottomButton from "@components/common/BottomButton";
import MoodPickerCard from "@features/mood/components/MoodPickerCard";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { MoodIdType } from "../types/mood.type";
import MoodNoteCard from "../components/MoodNoteCard";

export function MoodAddScreen() {
  const [mood, setMood] = useState<MoodIdType | null>("spectacular");
  const [note, setNote] = useState<string>();

  const pickedMoodHandler = (pickedMoodId: MoodIdType) => {
    console.log("pickedMoodId", pickedMoodId);
    setMood(pickedMoodId);
  };

  const noteChangeHandler = (text: string) => {
    console.log("text", text);
    setNote(text);
  };

  return (
    <>
      <KeyboardAvoidingView behavior={"position"} className="flex-1">
        <ScrollView contentContainerClassName="pb-24 p-6">
          <View className="flex-1 gap-4">
            <MoodPickerCard value={mood} onChange={pickedMoodHandler} />
            <MoodNoteCard value={note} onChangeText={noteChangeHandler} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Bottom Button */}
      <BottomButton
        title="기록"
        onPress={() => {
          // console.log(mood);
          // setMood("angry");
        }}
        disabled
      />
    </>
  );
}
