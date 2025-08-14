import { View } from "react-native";
import Gradient from "./common/Gradient";

function BackgroundView({ children }: { children: React.ReactNode }) {
  return (
    <View className="bg-background">
      <Gradient
        variant="background"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 opacity-50"
        pointerEvents={"none"}
      />
      {children}
    </View>
  );
}

export default BackgroundView;
