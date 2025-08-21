import BottomButton from "@components/common/BottomButton";
import MoodPickerCard from "@features/mood/components/MoodPickerCard";
import { useState } from "react";
import { View } from "react-native";
import { MoodIdType } from "../types/mood.type";

export function MoodAddScreen() {
  const [mood, setMood] = useState<MoodIdType | null>("spectacular");

  const pickedMoodHandler = (pickedMoodId: MoodIdType) => {
    console.log("pickedMoodId", pickedMoodId);
    setMood(pickedMoodId);
  };

  return (
    <>
      <View className="flex-1 p-6">
        <MoodPickerCard value={mood} onChange={pickedMoodHandler} />
      </View>

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
