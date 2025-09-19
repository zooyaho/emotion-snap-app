import "react-native-gesture-handler";
import "nativewind";
import "@styles/global.css";

import AppLayout from "@components/AppLayout";
import AppProviders from "@providers/AppProviders";
import AppNavigator from "@navigation/AppNavigator";

export default function RootLayout() {
  return (
    <AppProviders>
      <AppLayout>
        <AppNavigator />
      </AppLayout>
    </AppProviders>
  );
}
