import "react-native-url-polyfill/auto";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  RenderHTMLConfigProvider,
  TRenderEngineProvider,
} from "react-native-render-html";
import { Provider } from "react-redux";
import { TamaguiProvider, Theme } from "tamagui";
import config from "../../tamagui.config";
import { store } from "../store";
import { customRenderer } from "../web";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <TamaguiProvider config={config}>
        <Theme name={colorScheme === "dark" ? "dark" : "light"}>
          <ThemeProvider
            value={colorScheme === "light" ? DefaultTheme : DarkTheme}
          >
            <TRenderEngineProvider>
              <RenderHTMLConfigProvider
                enableExperimentalMarginCollapsing
                renderers={customRenderer}
              >
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="item/[itemId]"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </RenderHTMLConfigProvider>
            </TRenderEngineProvider>
          </ThemeProvider>
        </Theme>
      </TamaguiProvider>
    </Provider>
  );
}
