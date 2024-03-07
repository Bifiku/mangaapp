import { View, StyleSheet, useWindowDimensions } from "react-native";
import { IStyleProps } from "../../types/types";
import { AppText } from "../ui/AppTexts/AppText";
import { DIMENSIONS, THEME } from "../../theme";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const widthMenu = 300;

export const Menu = ({ style }: IStyleProps) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ ...styles.default, left: width / 2 - widthMenu / 2 }}>
      <Feather name="home" size={24} color="white" />
      <MaterialIcons name="favorite-outline" size={24} color="white" />
      <Feather name="user" size={24} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    position: "absolute",
    bottom: DIMENSIONS.padding * 2,
    flex: 1,
    height: 65,
    width: widthMenu,
    backgroundColor: THEME.MAIN_COLOR,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 64,
    elevation: 8,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    opacity: 1,
  },
});
