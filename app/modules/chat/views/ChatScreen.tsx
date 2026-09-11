import { RouteProp } from "@react-navigation/native";
import { StackNavigationOptions, StackScreenProps } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { ChatStackParamList } from "../navigation/chatScreens";

const ChatScreen = () => {
    return (
        <View style={styles.container}>
           <Text>Chat Screen</Text> 
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

export const buildChatScreenOptions = (route: RouteProp<ChatStackParamList, 'chat'>): StackNavigationOptions => {
    const { username } = route.params;
    return ({
        headerTitle: () => <Text>{username}</Text>
    });
}

export default ChatScreen;
