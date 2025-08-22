import { Image, ImageProps, ImageResizeMode } from "react-native";
import type { MoodIdType } from "../types/mood.type";
import { MOOD_IMAGES } from "../services/moodAssets";

type MoodImagePropsType = {
  name: MoodIdType;
  width?: number;
  height?: number;
  resizeMode?: ImageResizeMode;
} & Omit<ImageProps, "source" | "resizeMode">;

export default function MoodImage({
  name,
  width = 64,
  height = 64,
  resizeMode = "contain",
  style,
  ...rest
}: MoodImagePropsType) {
  return (
    <Image
      source={MOOD_IMAGES[name]}
      style={[{ width, height }, style]}
      resizeMode={resizeMode}
      {...rest}
    />
  );
}
