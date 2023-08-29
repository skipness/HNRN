process.env.TAMAGUI_TARGET = "native";

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      "transform-inline-environment-variables",
      "react-native-reanimated/plugin",
    ],
  };
};
