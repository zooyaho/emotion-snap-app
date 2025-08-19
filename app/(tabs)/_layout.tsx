import { Tabs } from "expo-router";
import HomeIcon from "@assets/icons/home.svg";
import HistoryIcon from "@assets/icons/history.svg";
import StatsIcon from "@assets/icons/stats.svg";
import SettingsIcon from "@assets/icons/settings.svg";
import AddDarkIcon from "@assets/icons/tab-add-dark.svg";
import AddLightIcon from "@assets/icons/tab-add-light.svg";
import { View } from "react-native";
import { getTabColors } from "@utils/twColors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@providers/ThemeProvider";

export default function TabsLayout() {
  const { theme } = useTheme();
  const { active, inactive } = getTabColors(theme);
  const insets = useSafeAreaInsets();

  // 바(아이템 자체) 높이
  const ITEM_HEIGHT = 56; // 실제 아이콘이 들어가는 영역
  const BAR_HEIGHT = ITEM_HEIGHT + insets.bottom; // 안전영역 포함 바 전체 높이

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: active,
        tabBarInactiveTintColor: inactive,

        tabBarStyle: {
          borderTopWidth: 0,
          height: BAR_HEIGHT,
        },

        headerShown: false,
        tabBarShowLabel: false,
        sceneStyle: { backgroundColor: "transparent" },
        tabBarItemStyle: {
          height: ITEM_HEIGHT,
          paddingVertical: 9,
          // backgroundColor: "rgba(255,0,0,0.1)",
        },

        tabBarBackground: () => (
          <View className="flex-1 bg-neutral-50 border-t-[1px] border-t-neutral-100" />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "통계",
          tabBarIcon: ({ color, size }) => (
            <StatsIcon color={color} width={size} height={size} />
          ),
        }}
      />
      {/* 모달로 열리는 작성 화면. 탭에는 아이콘만 보이고, 누르면 /mood/add로 이동 */}
      <Tabs.Screen
        name="add"
        options={{
          // href: "(tabs)/add",
          href: "/mood/add",
          title: "추가",
          tabBarIcon: ({ color, size }) => (
            <View
              className="flex-1 justify-center mt-[18px]"
              style={{
                minHeight: ITEM_HEIGHT, // 56px
              }}
            >
              {theme === "light" ? (
                <AddLightIcon color={color} width={32} height={32} />
              ) : (
                <AddDarkIcon color={color} width={32} height={32} />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "기록함",
          tabBarIcon: ({ color, size }) => (
            <HistoryIcon color={color} width={size} height={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "설정",
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon color={color} width={size} height={size} />
          ),
        }}
      />
    </Tabs>
  );
}
