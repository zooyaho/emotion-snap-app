import type { MoodIdType } from "@features/mood/types/mood.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  moodFormSchema,
  type MoodFormValuesType,
} from "../schemas/mood.schema";
import { v4 as uuid } from "uuid";
import { addMoodEntry } from "../services/moodStorage";
import { router } from "expo-router";

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

  const submit = handleSubmit(async (data) => {
    console.log("Submit Data :: ", data);
    await addMoodEntry({
      id: uuid(),
      mood: data.mood as MoodIdType,
      note: data.note?.trim() || "",
      createdAt: Date.now(),
    });
    router.back();
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
  };
};

export default useAddMood;
