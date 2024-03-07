import { Text, View, StyleSheet } from "react-native";
import { AppButtonProps } from "./AppButton.props";
import { TouchableOpacity } from "react-native-gesture-handler";

export const AppButton = ({ children, onPress, ...props }: AppButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.default, ...props.style }}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    minWidth: "40%",
    backgroundColor: "#3e4ce8",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
