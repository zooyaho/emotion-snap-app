import { Stack } from "expo-router";
import { ROUTE_NAME } from "@navigation/routes";

export default function AppNavigator() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name={ROUTE_NAME.GROUP.TABS} />
      <Stack.Screen name={ROUTE_NAME.GROUP.MOOD} />
    </Stack>
  );
}
