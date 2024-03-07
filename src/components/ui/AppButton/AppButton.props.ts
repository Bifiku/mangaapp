import {ButtonProps} from 'react-native'
import {StyleProps} from "react-native-reanimated";

export interface AppButtonProps extends Partial<ButtonProps> {
    onPress: () => void,
    children: string,
    style?: StyleProps
}