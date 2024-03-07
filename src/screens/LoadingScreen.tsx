import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { THEME } from "../theme";

const LoadingScreen = () => {
  return (
    <View style={styles.default}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: THEME.BACKGROUND_COLOR,
    gap: 10,
  },
  text: {
    color: THEME.TEXT_COLOR,
  },
});

export default LoadingScreen;
