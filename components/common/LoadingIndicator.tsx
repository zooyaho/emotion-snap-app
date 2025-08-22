import { useTheme } from "@providers/ThemeProvider";
import LottieView from "lottie-react-native";
import { useMemo } from "react";

type ColorType = "primary" | "background" | "gray";

type LoadingIndicatorPropsType = {
  width?: number;
  height?: number;
  color?: ColorType;
};

/*
"primary" : #C84771 / #E37599
"background": #FAF9F6 / #141417
"gray": #83818E / #7A7887
*/

const LOADING_SOURCES: Record<ColorType, { light: any; dark: any }> = {
  primary: {
    light: require("@assets/lotties/loading-primary.json"),
    dark: require("@assets/lotties/loading-primary-dark.json"),
  },
  background: {
    light: require("@assets/lotties/loading-background.json"),
    dark: require("@assets/lotties/loading-background-dark.json"),
  },
  gray: {
    light: require("@assets/lotties/loading-gray.json"),
    dark: require("@assets/lotties/loading-gray-dark.json"),
  },
};

export default function LoadingIndicator({
  width = 22,
  height = 22,
  color = "gray",
}: LoadingIndicatorPropsType) {
  const { theme } = useTheme();

  const lottieSource = useMemo(
    () => LOADING_SOURCES[color][theme === "dark" ? "dark" : "light"],
    [color, theme]
  );

  return (
    <LottieView source={lottieSource} autoPlay loop style={{ width, height }} />
  );
}
