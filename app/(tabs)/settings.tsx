// app/(tabs)/settings.tsx
import { AppButton } from "@components/common/AppButton";
import { AppInput } from "@components/common/AppInput";
import { AppTextarea } from "@components/common/AppTextarea";
import { BaseField } from "@components/common/BaseField";
import ThemeToggle from "@components/ThemeToggle";
import { View, Text } from "react-native";

export default function Settings() {
  return (
    <View className="w-[80%] flex-1 gap-4 ml-5 px-3">
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
        onPress={() => {
          console.log("Click");
        }}
      />
      <AppButton
        title="Button"
        variant="primary"
        size="sm"
        iconName="chevron-forward"
      />
      <AppButton
        title="Button"
        variant="secondary"
        iconName="chevron-forward"
        iconPosition="left"
      />
      {/* xs */}
      <AppButton title="Button" variant="outline" size="xs" disabled />
    </View>
  );
}
