import "react-native-get-random-values";
import type { MoodIdType } from "@features/mood/types/mood.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  moodFormSchema,
  type MoodFormValuesType,
} from "../schemas/mood.schema";
import { v4 as uuidv4 } from "uuid";
import { addMoodEntry } from "../services/moodStorage";
import { router } from "expo-router";
import useModal from "@hooks/useModal";
import { Alert } from "react-native";

const useAddMood = () => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<MoodFormValuesType>({
    resolver: zodResolver(moodFormSchema),
    mode: "onChange",
    defaultValues: {
      mood: "",
      note: "",
    },
  });
  const successModalController = useModal();

  const submit = handleSubmit(async (data) => {
    console.log("Submit Data :: ", data);
    try {
      await addMoodEntry({
        id: uuidv4(),
        moodId: data.mood as MoodIdType,
        note: data.note?.trim() || "",
        createdAt: Date.now(),
      });
      successModalController.open();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "홈으로 이동합니다."); // TODO :: router연결
    }
  });

  return {
    mood: (watch("mood") || null) as MoodIdType | null,
    note: watch("note") || "",
    setMood: (m: MoodIdType) => setValue("mood", m, { shouldValidate: true }),
    setNote: (n: string) => setValue("note", n, { shouldValidate: true }),
    isValid,
    submit,
    isSubmitting: isSubmitting,
    errors,
    successModalController,
  };
};

export default useAddMood;
