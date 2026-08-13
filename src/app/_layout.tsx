import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

SplashScreen.preventAutoHideAsync();

function WhatsAppFAB() {
  return (
    <Pressable
      style={({ pressed }) => [
        fab.btn,
        pressed && { transform: [{ scale: 0.92 }] },
      ]}
      onPress={() => Linking.openURL("https://wa.me/22959000892")}
      accessibilityLabel="Contacter sur WhatsApp"
    >
      <Text style={fab.icon}>💬</Text>
    </Pressable>
  );
}

const fab = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 104 : Platform.OS === "web" ? 88 : 84,
    right: 18,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#25D366",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 10,
    zIndex: 9999,
  },
  icon: { fontSize: 26, lineHeight: 30 },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="project/[id]"
            options={{
              headerShown: true,
              headerBackTitle: "Retour",
              title: "",
              headerStyle: { backgroundColor: isDark ? "#0A0A0A" : "#FAFAFA" },
              headerTintColor: isDark ? "#F0F0F0" : "#111111",
              headerShadowVisible: false,
            }}
          />
        </Stack>
        <WhatsAppFAB />
      </View>
    </ThemeProvider>
  );
}
