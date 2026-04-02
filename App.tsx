import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import AnimatedSplash from "./components/AnimatedSplash";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [showAnimatedSplash, setShowAnimatedSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.hideAsync();
      setAppReady(true);
    };
    prepare();
  }, []);

  const handleAnimationFinish = () => {
    setShowAnimatedSplash(false);
  };

  if (!appReady || !fontsLoaded) {
    return null;
  }

  if (showAnimatedSplash) {
    return <AnimatedSplash onFinish={handleAnimationFinish} />;
  }

  return (
    <>
      <StatusBar style="light" />
    </>
  );
}
