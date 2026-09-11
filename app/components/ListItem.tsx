import { memo } from "react";
import { Pressable, StyleSheet, Text,  } from "react-native";

interface ListItemProps {
    leadingElement: string | React.ReactNode;
    title: string | React.ReactNode;
    subtitle: string | React.ReactNode;
    trailingElement: string | React.ReactNode;
    enabled?: boolean;
    onPress?: () => void;
}

const ListItem = (props: ListItemProps) => {
    const {
        leadingElement,
        title,
        subtitle,
        trailingElement,
        enabled = true,
        onPress
    } = props;

    const isListItemDisabled = !Boolean(onPress) || !enabled;

    const renderLeadingElement = () => {
        if (typeof leadingElement === 'string') {
            return (
                <Text>{leadingElement}</Text>
            );
        }
    };

    const renderContent = () => {
        if (typeof title === 'string') {
            return (
                <>
                    <Text>{title}</Text>
                    <Text>{subtitle}</Text>
                </>
            );
        }
    };

    const renderTrailingElement = () => {
        if (typeof trailingElement === 'string') {
            return (
                <Text>{trailingElement}</Text>
            );
        }
    };

    return (
        <Pressable
            disabled={isListItemDisabled}
            onPress={onPress}
            style={styles.listItemContainer}
        >
            {renderLeadingElement()}
            {renderContent()}
            {renderTrailingElement()}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        padding: 16,
    },
    leadingElementContainer: {

    },
    contentContainer: {

    },
    trailingElementContainer: {

    }
});

export default memo(ListItem);