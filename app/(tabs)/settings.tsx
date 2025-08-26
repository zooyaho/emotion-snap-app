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
import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { format } from "date-fns";

export default function Settings() {
  const modal = useModal();
  const today = new Date();
  return (
    <ScrollView className="flex-1 gap-4 p-8">
      <Text className="text-[--color-primary-500]">설정</Text>
      <MoodNoteCard
        moodId="happy"
        createdDate={format(today, "yyyy.MM.dd HH:mm")}
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
  );
}
