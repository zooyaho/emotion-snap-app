import "nativewind";
import "../global.css";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@providers/ThemeProvider";
import RootLayout from "@components/RootLayout";
import ThemeToggle from "@components/ThemeToggle";

export default function RootLayoutWrapper() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <RootLayout>
          <ThemeToggle />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </RootLayout>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
