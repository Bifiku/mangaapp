import { StyleProps } from "react-native-reanimated";
import { TextProps } from "react-native";

type fontFamily =
  | "Oswald-Bold"
  | "Poppins-Regular"
  | "Poppins-Bold"
  | "Poppins-Medium";

export interface AppTextType extends TextProps {
  children: string | number;
  fontFamily?: fontFamily;
  style?: StyleProps;
}
