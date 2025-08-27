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
import useModal, { ModalControllerType } from "@hooks/useModal";
import { Alert } from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";

type UseMoodModeType = "add" | "edit";

type ReturnType = {
  // form values + setters
  moodValue: MoodIdType | null;
  noteValue: string;
  setMoodValue: (m: MoodIdType) => void;
  setNoteValue: (n: string) => void;
  // submit
  submit: () => void;
  // states
  isValid: boolean;
  isSubmitting: boolean;
  isInitialDataLoading: boolean; // edit일 때 초기 로딩 표시용
  isNotFound: boolean; // edit에서 id 없음/데이터 없음
  errors: Record<string, unknown>;
  // modal
  successModalController: ModalControllerType;
};

export default function useMood(
  mode: UseMoodModeType,
  moodId?: string
): ReturnType {
  const successModalController = useModal();
  const [isInitialDataLoading, setIsInitialDataLoading] = useState(
    mode === "edit"
  ); // edit은 초기에 로드 필요
  const [isNotFound, setIsNotFound] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<MoodFormValuesType>({
    resolver: zodResolver(moodFormSchema),
    mode: "onChange",
    defaultValues: { moodValue: "", noteValue: "" },
  });

  // 외부에서 사용할 값/함수
  const moodValue = (watch("moodValue") || null) as MoodIdType | null;
  const noteValue = watch("noteValue") || "";

  const setMoodValue = (m: MoodIdType) =>
    setValue("moodValue", m, { shouldValidate: true });
  const setNoteValue = (n: string) =>
    setValue("noteValue", n, { shouldValidate: true });

  // 제출 공통 핸들러
  const submit = handleSubmit(async (data) => {
    try {
      if (mode === "add") {
        await addMoodEntry({
          moodId: data.moodValue as MoodIdType,
          note: data.noteValue?.trim() || "",
          createdAt: Date.now(),
        });
      } else if (mode === "edit" && moodId) {
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

  useEffect(() => {
    if (mode !== "edit" || !moodId) return;

    let cancelled = false;
    (async () => {
      try {
        setIsInitialDataLoading(true);
        const entry = await getMoodEntryById(moodId);
        if (cancelled) return;

        if (!entry) {
          setIsNotFound(true);
          Alert.alert("Error", "해당 기록을 찾을 수 없습니다.");
          return;
        }

        reset({ moodValue: entry.moodId, noteValue: entry.note });
      } catch {
        if (!cancelled) Alert.alert("Error", "기록을 불러오지 못했습니다.");
      } finally {
        if (!cancelled) setIsInitialDataLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mode, moodId, reset]);

  return useMemo(
    () => ({
      moodValue,
      noteValue,
      setMoodValue,
      setNoteValue,
      submit,
      isValid,
      isSubmitting,
      isInitialDataLoading,
      isNotFound,
      errors,
      successModalController,
    }),
    [
      moodValue,
      noteValue,
      submit,
      isValid,
      isSubmitting,
      isInitialDataLoading,
      isNotFound,
      errors,
      successModalController,
    ]
  );
}
