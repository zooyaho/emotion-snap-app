import "nativewind";
import "../global.css";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "@providers/ThemeProvider";
import RootLayout from "@components/RootLayout";

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
            {/* Bottom Tabs */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* 감정 노트 추가/읽기/수정 */}
            <Stack.Screen
              name="mood/add"
              options={{
                headerShown: true,
                title: "감정 기록",
              }}
            />
            <Stack.Screen
              name="mood/[moodId]"
              options={{ headerShown: true, title: "감정 노트" }}
            />
            <Stack.Screen
              name="mood/edit/[moodId]"
              options={{ headerShown: true, title: "감정 노트 수정" }}
            />
          </Stack>
        </RootLayout>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
