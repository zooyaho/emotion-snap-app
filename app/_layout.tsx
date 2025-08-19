import "nativewind";
import "../global.css";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@providers/ThemeProvider";
import RootLayout from "@components/RootLayout";
import { ROUTE_NAME } from "consts/routes";

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
            <Stack.Screen
              name={ROUTE_NAME.GROUP.TABS}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={ROUTE_NAME.GROUP.MOOD}
              options={{ headerShown: false }}
            />
          </Stack>
        </RootLayout>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
