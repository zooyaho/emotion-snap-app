import "./global.css";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import Typography from "./src/components/common/Typography";

export default function App() {
  const [isFontsLoaded] = useFonts({
    "binggrae-bold": require("./assets/fonts/Binggrae-Bold.otf"),
    binggrae: require("./assets/fonts/Binggrae.otf"),
  }); // 커스텀 폰트 로드

  if (!isFontsLoaded) {
    return <Text>Loading...</Text>; // 폰트가 로드될 때까지 대기
  }

  return (
    <View className="p-6 bg-background">
      <Typography variant="h5">오늘 기분을 기록해보세요</Typography>
      <Typography variant="xl">감정스냅 시작!</Typography>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
