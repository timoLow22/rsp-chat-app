import { useNavigation } from "@react-navigation/native";
import { StackNavigationOptions, StackNavigationProp } from "@react-navigation/stack";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";

import { ChatNavigationRoutes } from "../navigation/chatNavigationRoutes";
import { ChatStackParamList } from "../navigation/chatScreens";
import useGetChatsInfiniteQuery from "../hooks/useGetChatsInfiniteQuery";
import ChatHistoryItem from "../components/ChatHistoryItem";

const ChatHistoryScreen = () => {
    const navigation = useNavigation<StackNavigationProp<ChatStackParamList>>();
    const {
            chatUsers,
            isLoading,
            isFetching,
            loadMoreUsers,
        } = useGetChatsInfiniteQuery('timoLow-22');

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Content loading</Text> 
            </View>
        )
    }

    const renderList: ListRenderItem<chat.User> = ({ item }) => {
        const { avatar, username, name, id } = item;

        const onItemPress = () => navigation.navigate(ChatNavigationRoutes.ChatViewScreen, {
            userId: id.toString(),
            username,
            avatar,
            name,
        });

        return (
            <ChatHistoryItem
                receiverId={id.toString()}
                avatar={avatar}
                username={username}
                name={name}
                onPress={onItemPress}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={( item, index ) => `user-${item.id}-${index}`}
                data={chatUsers}
                renderItem={renderList}
                onEndReached={loadMoreUsers}
            />
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
