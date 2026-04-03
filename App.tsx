import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import AnimatedSplash from "./components/AnimatedSplash";
import Onboarding from "./components/Onboarding";
import MainApp from "./components/MainApp";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [showAnimatedSplash, setShowAnimatedSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showMainApp, setShowMainApp] = useState(false);
  const [appReady, setAppReady] = useState(false);

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.hideAsync();

      // TODO: Remove this temporary override to restore normal onboarding behavior
      // const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
      const hasSeenOnboarding = null; // Temporarily force onboarding to show

      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      } else {
        setShowMainApp(true);
      }

      setAppReady(true);
    };
    prepare();
  }, []);

  const handleAnimationFinish = () => {
    setShowAnimatedSplash(false);
  };

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    setShowOnboarding(false);
    setShowMainApp(true);
  };

  if (!appReady || !fontsLoaded) {
    return null;
  }

  if (showAnimatedSplash) {
    return <AnimatedSplash onFinish={handleAnimationFinish} />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (showMainApp) {
    return <MainApp />;
  }

  return null;
}
