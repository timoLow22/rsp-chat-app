import { memo } from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, View,  } from "react-native";

import Body from "./typography/Body";

interface ListItemProps {
    imgSrc?: ImageSourcePropType;
    leadingElement?: React.ReactNode;
    contentElement: React.ReactNode;
    trailingElement: string | React.ReactNode;
    enabled?: boolean;
    onPress?: () => void;
}

const ListItem = (props: ListItemProps) => {
    const {
        imgSrc,
        leadingElement,
        contentElement,
        trailingElement,
        enabled = true,
        onPress
    } = props;

    const isListItemDisabled = !Boolean(onPress) || !enabled;

    const renderLeadingElement = () => {
        if (imgSrc) {
            return (
                <Image source={imgSrc} style={styles.imgContainer} />
            );
        }

        return leadingElement;
    };

    const renderTrailingElement = () => {
        if (typeof trailingElement === 'string') {
            return (
                <Body size="xsmall">{trailingElement}</Body>
            );
        }

        return trailingElement;
    };

    return (
        <Pressable
            disabled={isListItemDisabled}
            onPress={onPress}
            style={({ pressed }) => [
                styles.listItemContainer,
                { opacity: !isListItemDisabled && pressed ? 0.5 : 1.0 }
            ]}
        >
            <View style={styles.leadingElementContainer}>
                {renderLeadingElement()}
            </View>
            {contentElement}
            <View style={styles.trailingElementContainer}>
                {renderTrailingElement()}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    imgContainer: {
        borderRadius: 50,
        height: 50,
        width: 50,
    },
    leadingElementContainer: {
        paddingHorizontal: 16,
    },
    trailingElementContainer: {
        paddingHorizontal: 16,
    },
});

export default memo(ListItem);