import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const { Navigator } = createMaterialTopTabNavigator();
export const TopTabs = withLayoutContext(Navigator);

export default function StatsTabsLayout() {
  return (
    <TopTabs
      screenOptions={{
        tabBarIndicatorStyle: { height: 3 },
        tabBarLabelStyle: { fontWeight: "600" },
        sceneStyle: { backgroundColor: "transparent" },
      }}
    >
      <TopTabs.Screen name="daily" options={{ title: "일간" }} />
      <TopTabs.Screen name="monthly" options={{ title: "월간" }} />
      <TopTabs.Screen name="yearly" options={{ title: "연간" }} />
    </TopTabs>
  );
}
