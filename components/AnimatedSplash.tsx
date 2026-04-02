import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "../constants/globalStyles";

const { width, height } = Dimensions.get("window");

interface AnimatedSplashProps {
  onFinish: () => void;
}

export default function AnimatedSplash({ onFinish }: AnimatedSplashProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const breatheScale = useRef(new Animated.Value(1)).current;
  const breatheOpacity = useRef(new Animated.Value(0.3)).current;
  const dot1Scale = useRef(new Animated.Value(1)).current;
  const dot2Scale = useRef(new Animated.Value(1)).current;
  const dot3Scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(breatheOpacity, {
            toValue: 0.8,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          Animated.timing(breatheScale, {
            toValue: 1.1,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
        ]),
        Animated.parallel([
          Animated.timing(breatheOpacity, {
            toValue: 0.3,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          Animated.timing(breatheScale, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
        ]),
      ]),
    ).start();

    const createDotAnimation = (dotScale: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dotScale, {
            toValue: 1.5,
            duration: 700,
            delay: delay,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          Animated.timing(dotScale, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
        ]),
      );
    };

    createDotAnimation(dot1Scale, 0).start();
    createDotAnimation(dot2Scale, 200).start();
    createDotAnimation(dot3Scale, 400).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.View
        style={[
          styles.subtleBg,
          {
            opacity: breatheOpacity,
            transform: [{ scale: breatheScale }],
          },
        ]}
      >
        <LinearGradient
          colors={[`rgba(57, 255, 20, 0.08)`, "transparent"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <View style={styles.content}>
        <Text style={styles.yandaText}>
          Yand<Text style={styles.neonA}>ä</Text>
        </Text>

        <View style={styles.loadingDots}>
          <Animated.View
            style={[styles.loadingDot, { transform: [{ scale: dot1Scale }] }]}
          />
          <Animated.View
            style={[styles.loadingDot, { transform: [{ scale: dot2Scale }] }]}
          />
          <Animated.View
            style={[styles.loadingDot, { transform: [{ scale: dot3Scale }] }]}
          />
        </View>

        <View style={styles.poweredSection}>
          <Text style={styles.poweredText}>POWERED BY</Text>
          <Text style={styles.marketplaceName}>YANDA MARKETPLACE</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    backgroundColor: colors.primary,
    zIndex: 9999,
  },
  subtleBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  yandaText: {
    fontSize: 50,
    fontWeight: "400",
    letterSpacing: 4,
    color: colors.textPrimary,
    fontFamily: fonts.regular,
    zIndex: 2,
  },
  neonA: {
    color: colors.accent,
    fontFamily: fonts.regular,
  },
  loadingDots: {
    marginTop: 20,
    flexDirection: "row",
    gap: 12,
    zIndex: 2,
  },
  loadingDot: {
    width: 6,
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 3,
  },
  poweredSection: {
    position: "absolute",
    bottom: 80,
    alignItems: "center",
    width: "100%",
    zIndex: 2,
  },
  poweredText: {
    fontSize: 11,
    fontWeight: "400",
    color: colors.textSecondary,
    letterSpacing: 3,
    marginBottom: 8,
    fontFamily: fonts.regular,
  },
  marketplaceName: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.accent,
    letterSpacing: 4,
    fontFamily: fonts.medium,
  },
});
