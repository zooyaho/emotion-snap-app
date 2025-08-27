import type { MoodIdType } from "@features/mood/types/mood.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  moodFormSchema,
  type MoodFormValuesType,
} from "../schemas/mood.schema";
import {
  addMoodEntry,
  getMoodEntryById,
  updateMoodEntry,
} from "../services/moodStorage";
import { router } from "expo-router";
import useModal from "@hooks/useModal";
import { Alert } from "react-native";
import { useEffect } from "react";

const useEditMood = (moodId?: string) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<MoodFormValuesType>({
    resolver: zodResolver(moodFormSchema),
    mode: "onChange",
    defaultValues: {
      moodValue: "",
      noteValue: "",
    },
  });
  const successModalController = useModal();

  /** 제출 핸들러 */
  const submit = handleSubmit(async (data) => {
    console.log("Submit Data :: ", data);
    try {
      if (moodId) {
        await updateMoodEntry(moodId, {
          moodId: data.moodValue as MoodIdType,
          note: data.noteValue?.trim() || "",
        });
      }
      successModalController.open();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "홈으로 이동합니다.");
      router.replace("/home");
    }
  });

  /** 기존 데이터 불러오기 */
  useEffect(() => {
    if (!moodId) return;

    (async () => {
      try {
        const entry = await getMoodEntryById(moodId);
        if (entry) {
          setValue("moodValue", entry.moodId, { shouldValidate: true });
          setValue("noteValue", entry.note, { shouldValidate: true });
        } else {
          Alert.alert("Error", "해당 기록을 찾을 수 없습니다.");
          router.back();
        }
      } catch (err) {
        console.log("getMoodEntryById Error:", err);
        Alert.alert("Error", "기록을 불러오지 못했습니다.");
      }
    })();
  }, [moodId, setValue]);

  return {
    moodValue: (watch("moodValue") || null) as MoodIdType | null,
    noteValue: watch("noteValue") || "",
    setMoodValue: (m: MoodIdType) =>
      setValue("moodValue", m, { shouldValidate: true }),
    setNoteValue: (n: string) =>
      setValue("noteValue", n, { shouldValidate: true }),
    isValid,
    submit,
    isSubmitting: isSubmitting,
    errors,
    successModalController,
  };
};

export default useEditMood;
