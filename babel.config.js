module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        { jsxImportSource: "nativewind", reanimated: false },
      ],
      "nativewind/babel",
    ],
    plugins: [
      // "expo-router/babel", // SDK 50+에서는 expo-router/babel 불필요
      "react-native-worklets/plugin",
    ],
  };
};
