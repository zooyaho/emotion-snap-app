// app/(tabs)/settings.tsx
import { AppButton } from "@components/common/AppButton";
import { AppInput } from "@components/common/AppInput";
import { AppModal } from "@components/common/AppModal";
import { AppTextarea } from "@components/common/AppTextarea";
import { BaseField } from "@components/common/BaseField";
import LoadingIndicator from "@components/common/LoadingIndicator";
import ThemeToggle from "@components/ThemeToggle";
import useModal from "@hooks/useModal";
import { useState } from "react";
import { View, Text, ScrollView } from "react-native";

export default function Settings() {
  const modal = useModal();
  return (
    <ScrollView className="w-[80%] flex-1 gap-4 ml-5 px-3">
      <Text className="text-[--color-primary-500]">설정</Text>
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
        controller={modal}
        isDismissOnBackdrop
        // subButton={{ label: "취소", onPress: modal.close }}
        mainButton={{
          label: "삭제",
          onPress: () => {
            modal.close();
          },
          isLoading: true,
        }}
      >
        <View className="flex-center">
          <Text className="text-md text-neutral-600">기록을 삭제할까요?</Text>
        </View>
      </AppModal>
    </ScrollView>
  );
}
