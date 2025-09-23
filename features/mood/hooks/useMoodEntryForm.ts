import type { MoodIdType } from "@features/mood/types/mood.type";
import { zodResolver } from "@hookform/resolvers/zod";
import useModal, { ModalControllerType } from "@hooks/useModal";
import { HREF } from "@navigation/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import {
  moodFormSchema,
  type MoodFormValuesType,
} from "../schemas/mood.schema";
import {
  addMoodEntry,
  getMoodEntryById,
  updateMoodEntry,
} from "../services/moodStorage";
import { format } from "date-fns";

type ModeType = "add" | "edit";

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
  formErrors: Record<string, unknown>;
  // modal
  successModalController: ModalControllerType;
};

export default function useMoodEntryForm(
  mode: ModeType,
  moodId?: string
): ReturnType {
  const queryClient = useQueryClient();
  const successModalController = useModal();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors: formErrors, isSubmitting, isValid },
    reset,
  } = useForm<MoodFormValuesType>({
    resolver: zodResolver(moodFormSchema),
    mode: "onChange",
    defaultValues: { moodValue: "", noteValue: "" },
  });

  // 추가/수정 mutation
  const mutation = useMutation({
    mutationFn: async (data: MoodFormValuesType) => {
      if (mode === "add") {
        return addMoodEntry({
          moodId: data.moodValue as MoodIdType,
          note: data.noteValue?.trim() || "",
          createdAt: Date.now(),
        });
      } else if (mode === "edit" && moodId) {
        return updateMoodEntry(moodId, {
          moodId: data.moodValue as MoodIdType,
          note: data.noteValue?.trim() || "",
        });
      }
    },
    onSuccess: async () => {
      const date = format(Date.now(), "yyyy-MM-dd");
      const queryKey = ["entries", "day", date] as const;
      await queryClient.invalidateQueries({ queryKey });
      successModalController.open();
    },
    onError: (error) => {
      console.log(error);
      Alert.alert("Error", "홈으로 이동합니다.");
      router.replace(HREF.tabs.home);
    },
  });

  // edit 모드에서 초기 데이터 불러오기
  const {
    data: moodEntry,
    isPending: isInitialDataLoading,
    isError: isGetMoodEntryByIdError,
    isSuccess: isGetMoodEntryByIdSuccess,
  } = useQuery({
    queryKey: ["moodEntry", moodId],
    queryFn: () => getMoodEntryById(moodId!),
    enabled: mode === "edit" && !!moodId,
  });

  const isNotFound =
    mode === "edit" && !!moodId && isGetMoodEntryByIdSuccess && !moodEntry;

  // getMoodEntryById 요청 성공 시 폼 초기화
  useEffect(() => {
    if (!isGetMoodEntryByIdSuccess) return;
    if (moodEntry) {
      reset({ moodValue: moodEntry.moodId, noteValue: moodEntry.note });
    } else {
      // 데이터 없음 = NotFound
      Alert.alert("Error", "해당 기록을 찾을 수 없습니다.");
    }
  }, [isGetMoodEntryByIdSuccess, moodEntry, reset]);

  // getMoodEntryById 요청 에러 핸들링
  useEffect(() => {
    if (!isGetMoodEntryByIdError) return;
    Alert.alert("Error", "기록을 불러오지 못했습니다.");
  }, [isGetMoodEntryByIdError]);

  // 외부에서 사용할 값/함수
  const moodValue = (watch("moodValue") || null) as MoodIdType | null;
  const noteValue = watch("noteValue") || "";

  const setMoodValue = (m: MoodIdType) =>
    setValue("moodValue", m, { shouldValidate: true });
  const setNoteValue = (n: string) =>
    setValue("noteValue", n, { shouldValidate: true });

  // 제출 핸들러 (mutation 사용)
  const submit = handleSubmit((data) => mutation.mutate(data));

  return useMemo(
    () => ({
      moodValue,
      noteValue,
      setMoodValue,
      setNoteValue,
      submit,
      isValid,
      isSubmitting: isSubmitting || mutation.isPending,
      isInitialDataLoading,
      isNotFound,
      formErrors,
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
      formErrors,
      successModalController,
      mutation.isPending,
    ]
  );
}
