import { cn } from "@utils/cn";
import {
  Pressable,
  Text,
  View,
  TextLayoutEventData,
  NativeSyntheticEvent,
} from "react-native";
import MoodImage from "./MoodImage";
import { MoodIdType } from "../types/mood.type";
import { useTheme } from "@providers/ThemeProvider";
import { ThemedIonicon } from "@components/common/ThemedIonicon";
import { getMoodHex } from "../utils/moodColors";
import { useCallback, useRef, useState } from "react";
import { router } from "expo-router";
import { HREF } from "@constants/routes";
import { AppModal } from "@components/common/AppModal";
import useModal from "@hooks/useModal";

type MoodNoteCardPropsType = {
  id: string;
  moodId: MoodIdType;
  createdDate: string;
  content: string;
  onDeletePress?: (id: string) => Promise<void>;
  containerClassName?: string;
};

export default function MoodNoteCard({
  id,
  moodId,
  createdDate,
  content,
  containerClassName,
  onDeletePress,
}: MoodNoteCardPropsType) {
  const { theme } = useTheme();
  const deleteConfirmModalController = useModal();

  const [hasInitialLineMeasured, setHasInitialLineMeasured] = useState(false); // 최초 한 번 전체 줄수 측정 했는지 확인 상태
  const [isExpanded, setIsExpanded] = useState(false); // 펼침/접힘 상태
  const [isExpandable, setIsExpandable] = useState(false); // 확장 가능 여부

  const MAX_LINES = 5;

  const handleEditBtn = () => {
    // 수정 페이지로 이동
    router.push(HREF.mood.edit(id));
  };
  const handleDeleteBtn = () => {
    // 삭제 확인 모달 활성화
    deleteConfirmModalController.open();
  };
  const handleDeleteConfirm = async () => {
    await onDeletePress?.(id);
    await deleteConfirmModalController.closeAsync();
  };

  const onContentTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (hasInitialLineMeasured) return;
      const totalLines = e.nativeEvent?.lines?.length ?? 0;

      setIsExpandable(totalLines > MAX_LINES);
      setHasInitialLineMeasured(true); // 전체 줄 수 측정 완료
    },
    [hasInitialLineMeasured]
  );

  const toggleExpand = useCallback(() => {
    setIsExpanded((v) => !v);
  }, []);

  return (
    <>
      <View
        className={cn(
          "rounded-2xl bg-background p-4 gap-2 h-fit",
          theme === "light" ? "elev-center-low" : "elev-center-low-dark",
          containerClassName
        )}
      >
        {/* HEADER */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row justify-between items-center gap-2">
            <MoodImage name={moodId} width={46} height={46} />
            <View>
              <Text
                className={cn("text-h4")}
                style={{ color: getMoodHex(moodId, "text") }}
                numberOfLines={1}
              >
                {moodId.charAt(0).toUpperCase() + moodId.slice(1)}
              </Text>
              <Text className={cn("text-xs text-neutral-300")}>
                {createdDate}
              </Text>
            </View>
          </View>
          {/* active btns */}
          <View className="flex-row">
            {/* 수정 버튼 */}
            <Pressable
              className="p-2"
              onPress={handleEditBtn}
              accessibilityRole="button"
              accessibilityLabel={"수정 버튼"}
            >
              <ThemedIonicon
                name="create-outline"
                size={18}
                colorToken="primary-600"
              />
            </Pressable>
            {/* 삭제 버튼 */}
            <Pressable
              className="p-2"
              onPress={handleDeleteBtn}
              accessibilityRole="button"
              accessibilityLabel={"삭제 버튼"}
            >
              <ThemedIonicon
                name="trash-outline"
                size={18}
                colorToken="primary-600"
              />
            </Pressable>
          </View>
        </View>
        {/* BODY */}
        <View className="gap-2">
          <Text
            className="text-sm text-neutral-600"
            onTextLayout={onContentTextLayout}
            // 측정 단계: 전체 줄수 측정 위해 제한 해제
            // 측정 완료 후: 접힘/펼침에 따라 5줄 제한 적용
            numberOfLines={
              !hasInitialLineMeasured
                ? undefined
                : isExpanded
                  ? undefined
                  : MAX_LINES
            }
            ellipsizeMode="tail"
            style={!hasInitialLineMeasured ? { opacity: 0 } : undefined} // 측정 중 깜빡임 방지
          >
            {content}
          </Text>

          {/* 화살표 토글 버튼: 5줄 초과일 때만 노출 */}
          {isExpandable && (
            <Pressable
              className="self-end"
              onPress={toggleExpand}
              hitSlop={12}
              accessibilityLabel={isExpanded ? "접기" : "펼치기"}
              accessibilityRole="button"
              style={{
                transform: [{ rotate: isExpanded ? "180deg" : "0deg" }],
              }}
            >
              <ThemedIonicon
                name="chevron-down"
                size={20}
                colorToken="primary-600"
              />
            </Pressable>
          )}
        </View>
      </View>
      <AppModal
        controller={deleteConfirmModalController}
        subButton={{
          label: "취소",
          onPress: deleteConfirmModalController.closeAsync,
        }}
        mainButton={{
          label: "삭제",
          onPress: handleDeleteConfirm,
        }}
      >
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-neutral-600">
            기록을 삭제 할까요?
          </Text>
        </View>
      </AppModal>
    </>
  );
}
