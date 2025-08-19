import { Redirect } from "expo-router";

/**
 * 앱 시작 시 가장 먼저 보여줄 화면을 /home으로 고정
 * 최초 진입 시 자동으로 (tabs)/home 으로 리다이렉트
 */
export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}
