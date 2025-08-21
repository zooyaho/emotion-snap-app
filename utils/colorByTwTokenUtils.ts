import getColorByTwToken from "./getColorByTwToken";

/**
 * rn의 기본 컴포넌트에 color관련 props에 tailwind config에 정의한
 * 색상을 지정하기 위한 함수들입니다.
 */
type SchemeType = "light" | "dark";

/**
 * BottomTab컴포넌트에서 사용하는 색상
 */
export function getBottomTabColors(scheme: SchemeType) {
  const active = getColorByTwToken(scheme, "primary-500");
  const inactive = getColorByTwToken(scheme, "neutral-300");

  return { active, inactive };
}

/**
 * BaseField컴포넌트에서 사용하는 색상
 */
export function getBaseFieldColors(scheme: SchemeType) {
  const placeholderColor = getColorByTwToken(scheme, "neutral-300");
  const cursorColor = getColorByTwToken(scheme, "primary-500");

  return { placeholderColor, cursorColor };
}
