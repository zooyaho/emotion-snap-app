import { AppHeader } from "@components/common/AppHeader";
import { ROUTE_NAME } from "constants/routes";
import { Stack } from "expo-router";

export default function MoodLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => null,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen
        name={ROUTE_NAME.MOOD.ADD}
        options={{
          title: "감정 기록",
          header: () => (
            <AppHeader centerType="title" title="감정 기록" leftType="back" />
          ),
        }}
      />
      <Stack.Screen
        name={ROUTE_NAME.MOOD.EDIT}
        options={{
          title: "감정 노트 수정",
          header: () => (
            <AppHeader centerType="title" title="감정 수정" leftType="back" />
          ),
        }}
      />
    </Stack>
  );
}
