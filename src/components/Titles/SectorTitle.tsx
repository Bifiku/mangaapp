import { View, StyleSheet } from "react-native";
import { AppText } from "../ui/AppTexts/AppText";
import { THEME } from "../../theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export const SectorTitle = ({
  title,
  seeMore,
  update,
  updateFunc,
}: {
  title?: string;
  seeMore: boolean;
  update?: boolean;
  updateFunc?: () => void;
}) => {
  return (
    <View style={styles.blockTitles}>
      {title && (
        <AppText style={styles.text} fontFamily="Oswald-Bold">
          {title}
        </AppText>
      )}
      {seeMore && (
        <AppText style={styles.seeMore} fontFamily="Poppins-Medium">
          See more
        </AppText>
      )}
      {update && updateFunc && (
        <TouchableOpacity onPress={() => updateFunc()}>
          <Ionicons
            name="refresh"
            size={24}
            style={{ color: THEME.MAIN_COLOR, top: -5 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  seeMore: {
    lineHeight: 18,
    fontSize: 12,
    color: THEME.MAIN_COLOR,
  },
  blockTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  text: {
    lineHeight: 36,
    fontSize: 24,
  },
});
