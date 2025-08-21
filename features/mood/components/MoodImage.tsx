import { Image, ImageProps } from "react-native";
import type { MoodIdType } from "../types/mood.type";
import { MOOD_IMAGES } from "../services/moodAssets";

type MoodImagePropsType = {
  name: MoodIdType;
  width?: number;
  height?: number;
} & Omit<ImageProps, "source">;

export default function MoodImage({
  name,
  width = 64,
  height = 64,
  style,
  ...rest
}: MoodImagePropsType) {
  return (
    <Image
      source={MOOD_IMAGES[name]}
      style={[{ width, height }, style]}
      {...rest}
    />
  );
}
