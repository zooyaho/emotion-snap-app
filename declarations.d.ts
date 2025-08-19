declare module "*.svg" {
  import * as React from "react";
  import { SvgProps } from "react-native-svg";
  import type { StyleProp, ViewStyle } from "react-native";

  type SvgWithTw = SvgProps & {
    className?: string; // NativeWind용
    style?: StyleProp<ViewStyle>; // 필요시 스타일
  };

  const content: React.FC<SvgWithTw>;
  export default content;
}
