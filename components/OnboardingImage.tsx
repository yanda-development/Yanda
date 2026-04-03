import React from "react";
import { Image, StyleSheet } from "react-native";

interface OnboardingImageProps {
  source: any;
  width?: number;
  height?: number;
}

export default function OnboardingImage({
  source,
  width = 200,
  height = 200,
}: OnboardingImageProps) {
  return (
    <Image
      source={source}
      style={[styles.image, { width, height }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
