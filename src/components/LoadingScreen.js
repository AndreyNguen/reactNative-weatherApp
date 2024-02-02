import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ActivityIndicator size={"large"} />
      <Text style={styles.text}>Получение данных геопозиции...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDF6AA",
  },
  text: {
    color: "#2c2c2c",
    fontSize: 20,
  },
});
