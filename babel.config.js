module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        { jsxImportSource: "nativewind" },
        // 업데이트 사항인 Worklets 플러그인은 Dev Client 빌드에서 안정적으로 사용 가능하여 reanimated 사용
        // { jsxImportSource: "nativewind", reanimated: false },
      ],
      "nativewind/babel",
    ],
    plugins: [
      // "expo-router/babel", // SDK 50+에서는 expo-router/babel 불필요
      "react-native-reanimated/plugin",
      // "react-native-worklets/plugin",
    ],
  };
};
