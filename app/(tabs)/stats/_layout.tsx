import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Animated, Text } from "react-native";
import { cn } from "@utils/cn";
import { Route, TabBarIndicatorProps } from "react-native-tab-view";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import getColorByTwToken from "@utils/getColorByTwToken";
import { useTheme } from "@providers/ThemeProvider";

const { Navigator } = createMaterialTopTabNavigator();
export const TopTabs = withLayoutContext(Navigator);

/** TabLabel */
function TabLabel({ focused, title }: { focused: boolean; title: string }) {
  return (
    <Text
      className={cn(
        "text-md",
        focused ? "text-primary-500" : "text-neutral-300"
      )}
    >
      {title}
    </Text>
  );
}

/** 커스텀 인디케이터
 *  - props.getTabWidth(i) 사용
 *  - translateX: 각 탭 시작점(누적폭)에 밑줄 중앙 정렬
 */
type IndicatorPropsType = Omit<
  TabBarIndicatorProps<Route>,
  "navigationState"
> & {
  state: TabNavigationState<ParamListBase>;
};

function UnderlineIndicator(props: IndicatorPropsType) {
  const { theme } = useTheme();
  const bgColor = getColorByTwToken(theme, "primary-500");
  const { position, getTabWidth, state } = props;
  const INDICATOR_W = 56;

  // 각 탭 시작 x 좌표 누적합
  const inputRange = state.routes.map((_, i) => i);
  const starts: number[] = [];
  let acc = 0;
  state.routes.forEach((_, i) => {
    starts.push(acc);
    acc += getTabWidth(i);
  });

  const outputRange = state.routes.map(
    (_, i) => starts[i] + (getTabWidth(i) - INDICATOR_W) / 2
  );

  const translateX = (position as any).interpolate({ inputRange, outputRange });

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        width: INDICATOR_W,
        height: 2,
        backgroundColor: bgColor,
        transform: [{ translateX }],
      }}
    />
  );
}

export default function StatsTabsLayout() {
  return (
    <TopTabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 0, // Android
          shadowOpacity: 0, // iOS
        },
        tabBarPressColor: "transparent",
        // 기본 인디케이터 숨기고 커스텀 사용
        tabBarIndicatorStyle: { backgroundColor: "transparent" },
        tabBarIndicator: (p) => <UnderlineIndicator {...p} />,
        tabBarItemStyle: { paddingVertical: 20 },
        sceneStyle: { backgroundColor: "transparent" },
      }}
    >
      <TopTabs.Screen
        name="daily"
        options={{
          title: "일간",
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <TabLabel focused={focused} title="일간" />
          ),
        }}
      />
      <TopTabs.Screen
        name="monthly"
        options={{
          title: "월간",
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <TabLabel focused={focused} title="월간" />
          ),
        }}
      />
      <TopTabs.Screen
        name="yearly"
        options={{
          title: "연간",
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <TabLabel focused={focused} title="연간" />
          ),
        }}
      />
    </TopTabs>
  );
}
