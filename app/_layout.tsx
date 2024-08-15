import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "jotai";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={DefaultTheme}>
      <Provider>
        <Stack>
          <Stack.Screen
            name="(pages)/index"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="(pages)/purchases/[purchaseId]"
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}
