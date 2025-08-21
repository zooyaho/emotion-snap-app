import "nativewind";
import "@styles/global.css";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@providers/ThemeProvider";
import RootLayout from "@components/RootLayout";
import { ROUTE_NAME } from "@constants/routes";

export default function RootLayoutWrapper() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <RootLayout>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen name={ROUTE_NAME.GROUP.TABS} />
            <Stack.Screen name={ROUTE_NAME.GROUP.MOOD} />
          </Stack>
        </RootLayout>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
