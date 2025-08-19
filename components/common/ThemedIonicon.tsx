import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@providers/ThemeProvider";
import { tokens } from "@styles/color-theme";
import { rgbTokenToColor } from "@utils/color";

interface ThemedIoniconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  colorToken?: string; // 예: "primary-500"
}

export function ThemedIonicon({
  name,
  size = 24,
  colorToken = "neutral-500",
}: ThemedIoniconProps) {
  const { theme } = useTheme();
  const variableName = `--color-${colorToken}`;
  const token =
    tokens[theme][variableName] || tokens[theme]["--color-neutral-500"];
  const color = rgbTokenToColor(token);

  return <Ionicons name={name} size={size} color={color} />;
}
