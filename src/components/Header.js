import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Text } from "react-native-paper";

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: "#4D4D4D",
    fontWeight: "bold",
    paddingVertical: 12,
    marginTop: Platform.OS === "ios" ? 30 : 20,
    marginLeft: 20,
  },
});
