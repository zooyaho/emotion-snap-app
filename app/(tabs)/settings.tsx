// app/(tabs)/settings.tsx
import { AppButton } from "@components/common/AppButton";
import { AppInput } from "@components/common/AppInput";
import { AppModal } from "@components/common/AppModal";
import { AppTextarea } from "@components/common/AppTextarea";
import { BaseField } from "@components/common/BaseField";
import LoadingIndicator from "@components/common/LoadingIndicator";
import ThemeToggle from "@components/ThemeToggle";
import MoodNoteCard from "@features/mood/components/MoodNoteCard";
import useModal from "@hooks/useModal";
import { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { format } from "date-fns";
import MoodVerticalBars from "@features/mood/components/MoodVerticalBars";

import { v4 as uuidv4 } from "uuid"; // uuid 라이브러리 사용
import { MoodEntryType } from "@features/mood/services/moodStorage";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import DateChip from "@components/common/DateChip";
import { AppBottomSheetRef } from "@components/common/AppBottomSheet";
import YearMonthDayPickerSheet from "@components/common/YearMonthDayPickerSheet";

export const dummyMoods: MoodEntryType[] = [
  {
    id: "123a",
    moodId: "angry",
    note: "회의 때문에 너무 짜증난 하루",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1, // 하루 전
  },
  {
    id: "123b",
    moodId: "happy",
    note: "오랜만에 친구를 만나서 즐거웠음",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "123c",
    moodId: "sad",
    note: "비가 와서 조금 우울한 기분",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "123d",
    moodId: "upset",
    note: "출근길에 날씨가 좋아서 기분 좋았음",
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: "123e",
    moodId: "upset",
    note: "프로젝트 발표가 대성공! 인생 최고의 하루",
    createdAt: Date.now() - 1000 * 60 * 30,
  },
  {
    id: "123g",
    moodId: "upset",
    note: "약속이 취소되어 속상했음",
    createdAt: Date.now() - 1000 * 60 * 60 * 10,
  },
  {
    id: "123h",
    moodId: "upset",
    note: "맛있는 저녁을 먹고 산책함",
    createdAt: Date.now(),
  },
];

export default function Settings() {
  const modal = useModal();
  const today = new Date();

  const ref = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["45%"], []);

  const sheetRef = useRef<AppBottomSheetRef>(null);

  const openPicker = () => sheetRef.current?.present();

  const handleConfirm = ({ year, month }: { year: number; month: number }) => {
    // 선택 결과로 목록 필터링/차트 업데이트 등
    console.log("선택된 연월:", year, month);
  };

  return (
    <>
      <ScrollView className="flex-1 gap-4 p-8">
        <Text className="text-[--color-primary-500]">설정</Text>
        <View className="flex-row gap-2">
          <DateChip type="default" weekday={"수"} day={1} />
          <DateChip type="disabled" weekday={"목"} day={2} />
          <DateChip type="selected" weekday={"금"} day={3} />
        </View>

        <AppButton title="Open YearMonthPickerSheet!" onPress={openPicker} />

        <YearMonthDayPickerSheet
          ref={sheetRef}
          // entries={entries}
          onConfirm={handleConfirm}
        />

        {/* <AppButton
          title="Open BottomSheet!"
          onPress={() => {
            // console.log("Open BottomSheet Click!!");
            // console.log("ref.current >> ", ref.current);
            ref.current?.present();
          }}
        />
        <BottomSheetModal
          ref={ref}
          snapPoints={snapPoints}
          index={0} // 이 줄을 유지합니다.
          // onChange={handleSheetChanges}
          enablePanDownToClose={true}
          enableDynamicSizing={false}
          // backdropComponent={CustomBackrop}
        >
          <BottomSheetView>
            <View style={{ padding: 16 }}>
              <Text>월 선택</Text>
            </View>
          </BottomSheetView>
        </BottomSheetModal> */}
        <MoodVerticalBars
          moodEntries={dummyMoods}
          //   height?: number; // 막대 트랙 높이
          //   barWidth?: number; // 막대 너비
          //   minFill?: number; // 값이 0이어도 최소 표시 높이
          // containerBg?: string; // 카드 배경
        />
        <MoodNoteCard
          id=":test"
          moodId="happy"
          createdDate={today}
          content="오늘은 정말 즐겁고 행복한 하루였어요. 오랜만에 친구들과 만나 웃고 떠들며 좋은 시간을 보냈고, 내가 좋아하는 취미 활동에도 집중할 수 있어 마음이 풍요로웠습니다. 모든 일이 순조롭게 풀려서 스트레스 없이 여유로운 시간을 보낼 수 있었어요. 이런 순간들이 쌓여서 내 삶에 큰 힘이 되고 있다는 걸 느꼈습니다. 앞으로도 이런 기쁨과 행복감을 자주 느끼며, 매 순간 감사하는 마음으로 살아가고 싶습니다. 오늘의 좋은 기억을 오래도록 간직할 거예요."
        />
        {/* <View className="w-40 h-20 rounded-2xl bg-white elev-down-low" />
      <View className="w-40 h-20 rounded-2xl bg-white elev-down-medium" /> */}
        <ThemeToggle />
        {/* <BaseField
        placeholder="Placeholder"
        assistiveText="힌트/에러 문구"
        left={<Text>Left</Text>}
        right={<Text>Right</Text>}
        isError={false}
        isDisabled={false}
        counter={{ current: 10, max: 100 }}
      />
      <BaseField /> */}
        <AppTextarea placeholder="Typing…" rows={5} maxLength={200} />
        <AppInput variant="password" />
        <AppInput variant="search" />
        {/* md */}
        <AppButton
          title="Button"
          // isLoading
          onPress={() => {
            console.log("Click");
          }}
        />
        <AppButton
          title="Button"
          variant="outline"
          isLoading
          size="sm"
          iconName="chevron-forward"
        />
        <AppButton
          title="Modal Show"
          variant="secondary"
          iconName="chevron-forward"
          iconPosition="left"
          // isLoading
          onPress={() => modal.open()}
        />
        {/* xs */}
        <AppButton title="Button" variant="outline" size="xs" disabled />
        <LoadingIndicator />
        <AppModal
          title="dkssud"
          controller={modal}
          isDismissOnBackdrop
          subButton={{ label: "취소", onPress: modal.closeAsync }}
          mainButton={{
            label: "삭제",
            onPress: () => {
              modal.closeAsync();
            },
            // isLoading: true,
          }}
        >
          <View className="flex-center">
            <Text className="text-md text-neutral-600">기록을 삭제할까요?</Text>
          </View>
        </AppModal>
      </ScrollView>
    </>
  );
}
