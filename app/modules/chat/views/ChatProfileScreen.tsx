import { StyleSheet, Text, View } from "react-native";

const ChatProfileScreen = () => {
    return (
        <View style={styles.container}>
           <Text>Chat Profile Screen</Text> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChatProfileScreen;
