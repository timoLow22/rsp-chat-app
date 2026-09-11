import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ChatNavigationRoutes } from "../navigation/chatNavigationRoutes";
import { StackNavigationOptions, StackNavigationProp } from "@react-navigation/stack";
import { ChatStackParamList } from "../navigation/chatScreens";
import useGetUsersInfiniteQuery from "../hooks/useGetUsersInfiniteQuery";
import ListItem from "../../../components/ListItem";

const ChatHistoryScreen = () => {
    const navigation = useNavigation<StackNavigationProp<ChatStackParamList>>();
    const { chatHistoryList, isLoading, isFetching } = useGetUsersInfiniteQuery('123');

    if (isLoading || isFetching) {
        return (
            <View style={styles.container}>
                <Text>Content loading</Text> 
            </View>
        )
    }

    const renderList = (item: chat.User, index: number) => {
        const { avatar, username, id } = item;
        const itemOnPress = () => navigation.navigate(ChatNavigationRoutes.ChatScreen, {
            // TODO: find a way to process the ID to become a string right at the query level
            userId: id.toString(),
            username,
        })
        return (
            <ListItem
                key={`user-${id}-${index}`}
                leadingElement={avatar}
                title={username}
                subtitle={'Test dummy string, need to randomize this'}
                trailingElement={'2026-09-12'}
                onPress={itemOnPress}
            />
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {chatHistoryList.map(renderList)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export const buildChatHistoryScreenOptions = (): StackNavigationOptions => {
    return ({
        headerTitle: 'Chat History'
    });
}

export default ChatHistoryScreen;
