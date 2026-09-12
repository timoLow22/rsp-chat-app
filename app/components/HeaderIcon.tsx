import FontAwesome, { FontAwesomeIconName } from "@react-native-vector-icons/fontawesome";
import { StyleSheet, TouchableOpacity } from "react-native";

interface HeaderIconProps {
    position?: 'left' | 'right';
    name: FontAwesomeIconName;
    size?: number;
    onPress: () => void;
}

const HEADER_ICON_HITSLOP = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
}

const HeaderIcon = (props: HeaderIconProps) => {
    const { 
        position = 'left',
        size = 16,
        name,
        onPress,
    } = props;
    
    return ( 
        <TouchableOpacity
            onPress={onPress}
            style={[styles.buttonContainer, styles[position]]}
            hitSlop={HEADER_ICON_HITSLOP}
        >
            <FontAwesome name={name} size={size} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 8,
        padding: 16,
    },
    left: {
        marginLeft: 8,
    },
    right: {
        marginRight: 8,
    }
});

export default HeaderIcon;