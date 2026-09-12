import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TextStyle } from "react-native"

interface HeadingProps {
    size: 'small' | 'medium' | 'large';
    style?: Omit<TextStyle, 'fontFamily' | 'fontSize' | 'fontWeight'>;
}

const Heading = (props: PropsWithChildren<HeadingProps>) => {
    const { children, size, style } = props;

    return (
        <Text style={[ style, styles[size] ]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    small: {
        fontFamily: 'ui-rounded',
        fontWeight: 300,
        fontSize: 12,
    },
    medium: {
        fontFamily: 'ui-rounded',
        fontWeight: 600,
        fontSize: 16,
    },
    large: {
        fontFamily: 'ui-rounded',
        fontWeight: 600,
        fontSize: 32,
    }
});

export default Heading;