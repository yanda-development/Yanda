import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fonts } from "../constants/globalStyles";

export default function MainApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Yanda!</Text>
      <Text style={styles.subtext}>Your main app content will go here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.textPrimary,
    fontSize: 24,
    fontFamily: fonts.medium,
    marginBottom: 10,
  },
  subtext: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
});
