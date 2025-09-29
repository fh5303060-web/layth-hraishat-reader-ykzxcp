
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { Button } from "@/components/button";
import { SystemBars } from "react-native-edge-to-edge";
import "react-native-reanimated";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts, Cairo_400Regular, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { Amiri_400Regular, Amiri_700Bold } from '@expo-google-fonts/amiri';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  let [fontsLoaded] = useFonts({
    Cairo_400Regular,
    Cairo_700Bold,
    Amiri_400Regular,
    Amiri_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // Custom light theme for Arabic educational app
  const LightTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1565C0',
      background: 'rgba(255, 255, 255, 0.95)',
      card: 'rgba(255, 255, 255, 0.9)',
      text: '#1565C0',
      border: '#E0E0E0',
      notification: '#D32F2F',
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={LightTheme}>
        <SystemBars style="dark" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            },
            headerTintColor: '#1565C0',
            headerTitleStyle: {
              fontFamily: 'Cairo_700Bold',
              fontSize: 18,
            },
            headerBackTitleStyle: {
              fontFamily: 'Cairo_400Regular',
            },
          }}
        >
          <Stack.Screen name="(index)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="membrane-details" 
            options={{ 
              title: "تفاصيل الغشاء البيلازمي",
              presentation: "card"
            }} 
          />
          <Stack.Screen 
            name="interactive-demo" 
            options={{ 
              title: "العرض التفاعلي",
              presentation: "card"
            }} 
          />
          <Stack.Screen 
            name="quiz" 
            options={{ 
              title: "اختبار المعلومات",
              presentation: "card"
            }} 
          />
          <Stack.Screen 
            name="modal" 
            options={{ 
              presentation: "modal",
              title: "معلومات إضافية"
            }} 
          />
          <Stack.Screen 
            name="formsheet" 
            options={{ 
              presentation: "formSheet",
              title: "نموذج"
            }} 
          />
          <Stack.Screen 
            name="transparent-modal" 
            options={{ 
              presentation: "transparentModal",
              title: "نافذة شفافة"
            }} 
          />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
