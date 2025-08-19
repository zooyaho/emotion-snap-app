import { Tabs, useRouter } from "expo-router";
import HomeIcon from "@assets/icons/home.svg";
import HistoryIcon from "@assets/icons/history.svg";
import StatsIcon from "@assets/icons/stats.svg";
import SettingsIcon from "@assets/icons/settings.svg";
import AddDarkIcon from "@assets/icons/tab-add-dark.svg";
import AddLightIcon from "@assets/icons/tab-add-light.svg";
import { View } from "react-native";
import getBottomTabColors from "@utils/getBottomTabColors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@providers/ThemeProvider";
import { HREF, ROUTE_NAME } from "consts/routes";
import { AppHeader } from "@components/common/AppHeader";

export default function TabsLayout() {
  const { theme } = useTheme();
  const { active, inactive } = getBottomTabColors(theme);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // 바(아이템 자체) 높이
  const ITEM_HEIGHT = 56; // 실제 아이콘이 들어가는 영역
  const BAR_HEIGHT = ITEM_HEIGHT + insets.bottom; // 안전영역 포함 바 전체 높이

  return (
    <Tabs
      initialRouteName={ROUTE_NAME.TABS.HOME}
      screenOptions={{
        tabBarActiveTintColor: active,
        tabBarInactiveTintColor: inactive,

        tabBarStyle: {
          borderTopWidth: 0,
          height: BAR_HEIGHT,
        },

        headerShown: true,
        header: () => null,
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
        name={ROUTE_NAME.TABS.HOME}
        options={{
          title: "홈",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon width={size} height={size} color={color} />
          ),
          header: () => <AppHeader centerType="logo" />,
        }}
      />
      <Tabs.Screen
        name={ROUTE_NAME.TABS.STATS}
        options={{
          title: "통계",
          tabBarIcon: ({ color, size }) => (
            <StatsIcon color={color} width={size} height={size} />
          ),
          header: () => <AppHeader centerType="title" title="감정 통계" />,
        }}
      />
      {/* 탭에는 아이콘만 보이고, 누르면 /mood/add로 이동 */}
      <Tabs.Screen
        name={ROUTE_NAME.TABS.ADD}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // 기본 이동 막고
            router.push(HREF.mood.add); // /mood/add로 이동
          },
        }}
        options={{
          title: "추가",
          tabBarIcon: ({ color, size }) => (
            <>
              {theme === "light" ? (
                <AddLightIcon width={32} height={32} />
              ) : (
                <AddDarkIcon width={32} height={32} />
              )}
            </>
          ),
        }}
      />
      <Tabs.Screen
        name={ROUTE_NAME.TABS.HISTORY}
        options={{
          title: "기록함",
          tabBarIcon: ({ color, size }) => (
            <HistoryIcon color={color} width={size} height={size} />
          ),
          header: () => <AppHeader centerType="title" title="감정 기록함" />,
        }}
      />
      <Tabs.Screen
        name={ROUTE_NAME.TABS.SETTINGS}
        options={{
          title: "설정",
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon color={color} width={size} height={size} />
          ),
          // header: () => (
          //   // <AppHeader
          //   //   centerType="title"
          //   //   title={"8월14일"}
          //   //   rightType="close"
          //   //   isDisabledRight
          //   // />
          //   <AppHeader title={"8월14일"} />
          // ),
          header: () => <AppHeader centerType="title" title="설정" />,
        }}
      />
    </Tabs>
  );
}
