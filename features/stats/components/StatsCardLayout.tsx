import { View, Text } from "react-native";

interface StatsCardLayoutPropsType {
  title?: string;
  children?: React.ReactNode;
}

export default function StatsCardLayout({
  title,
  children,
}: StatsCardLayoutPropsType) {
  return (
    <View className="my-6 mx-4 gap-3">
      <Text className="text-base text-neutral-600">{title}</Text>
      {children}
    </View>
  );
}
