import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import { ChatNavigationRoutes } from "../navigation/chatNavigationRoutes";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChatStackParamList } from "../navigation/chatScreens";

const ChatHistoryScreen = () => {
    const navigation = useNavigation<StackNavigationProp<ChatStackParamList>>();

    return (
        <View style={styles.container}>
           <Text>Chat History Screen</Text> 
           <Button title="Go to Chat" onPress={() => navigation.navigate(ChatNavigationRoutes.ChatScreen, {
                userId: 'something'
           })}/>
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

export default ChatHistoryScreen;
