import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TextStyle } from "react-native"

interface BodyProps {
    size: 'xsmall' | 'small' | 'medium' | 'large';
    style?: Omit<TextStyle, 'fontFamily' | 'fontSize'>;
}

const Body = (props: PropsWithChildren<BodyProps>) => {
    const { children, size, style } = props;

    return (
        <Text style={[ style, styles[size] ]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    xsmall: {
        fontFamily: 'ui-sans-serif',
        fontSize: 12,
    },
    small: {
        fontFamily: 'ui-sans-serif',
        fontSize: 14,
    },
    medium: {
        fontFamily: 'ui-sans-serif',
        fontSize: 16,
    },
    large: {
        fontFamily: 'ui-sans-serif',
        fontSize: 32,
    }
});

export default Body;