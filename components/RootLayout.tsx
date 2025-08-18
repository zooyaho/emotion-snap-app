import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import BackgroundView from "@components/BackgroundView";

function RootLayout({ children }: { children: React.ReactNode }) {
  const [isFontsLoaded] = useFonts({
    "binggrae-bold": require("@assets/fonts/Binggrae-Bold.otf"),
    binggrae: require("@assets/fonts/Binggrae.otf"),
  }); // 커스텀 폰트 로드

  if (!isFontsLoaded) {
    return <Text>Loading...</Text>; // 폰트가 로드될 때까지 대기
  }

  return (
    <View>
      <BackgroundView>{children}</BackgroundView>
    </View>
  );
}
export default RootLayout;
