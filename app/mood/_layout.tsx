import { AppHeader } from "@components/common/AppHeader";
import { ROUTE_NAME } from "consts/routes";
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
        name={ROUTE_NAME.MOOD.DETAIL}
        options={{ title: "감정 노트" }}
      />
      <Stack.Screen
        name={ROUTE_NAME.MOOD.EDIT}
        options={{ title: "감정 노트 수정" }}
      />
    </Stack>
  );
}
