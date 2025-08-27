import MoodEditScreen from "@features/mood/screens/MoodEditScreen";
import { useLocalSearchParams } from "expo-router";

export default function MoodEditRoute() {
  const { moodId } = useLocalSearchParams<{ moodId: string }>();
  return <MoodEditScreen moodId={moodId} />;
}
