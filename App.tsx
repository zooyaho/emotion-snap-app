import { View } from "react-native";
import "./global.css";
import Typography from "./src/components/common/Typography";
import RootLayout from "./src/components/RootLayout";
import ThemeToggle from "./src/components/ThemeToggle";
import { ThemeProvider } from "./src/providers/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <RootLayout>
        <View style={{ marginTop: 100, paddingHorizontal: 20, zIndex: 1 }}>
          <ThemeToggle />
        </View>
        <Typography variant="h5" className="text-primary-500">
          오늘 기분을 기록해보세요
        </Typography>
        <Typography variant="xl">감정스냅 시작!</Typography>
      </RootLayout>
    </ThemeProvider>
  );
}
