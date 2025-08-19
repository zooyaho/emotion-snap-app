// app/(tabs)/settings.tsx
import { AppButton } from "@components/common/AppButton";
import ThemeToggle from "@components/ThemeToggle";
import { View, Text } from "react-native";
export default function Settings() {
  return (
    <View className="w-[80%] flex-1 gap-4 ml-5">
      <Text>설정</Text>
      <ThemeToggle />

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
