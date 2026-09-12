import { useNavigation } from "@react-navigation/native";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { ChatNavigationRoutes } from "../navigation/chatNavigationRoutes";
import { StackNavigationOptions, StackNavigationProp } from "@react-navigation/stack";
import { ChatStackParamList } from "../navigation/chatScreens";
import useGetUsersInfiniteQuery from "../hooks/useGetUsersInfiniteQuery";
import ListItem from "../../../components/ListItem";
import Heading from "../../../components/typography/Heading";
import Body from "../../../components/typography/Body";

const ChatHistoryScreen = () => {
    const navigation = useNavigation<StackNavigationProp<ChatStackParamList>>();
    const {
            chatHistoryList,
            isLoading,
            isFetching,
            loadMoreUsers,
        } = useGetUsersInfiniteQuery('123'); // TODO do we even need a userId here?

    if (isLoading || isFetching) {
        return (
            <View style={styles.container}>
                <Text>Content loading</Text> 
            </View>
        )
    }

    const renderList: ListRenderItem<chat.User> = ({ item }) => {
        const { avatar, username, name, id } = item;

        const itemOnPress = () => navigation.navigate(ChatNavigationRoutes.ChatScreen, {
            // TODO: find a way to process the ID to become a string right at the query level
            userId: id.toString(),
            username,
        });

        const renderListContent = () => {
            return (
                <View style={styles.listContentContainer}>
                    <Heading size='medium'>{`${name} | ${username}`}</Heading>
                    <Body size="small">{'Test dummy string, need to randomize this'}</Body>
                </View>
            );
        }

        return (
            <ListItem
                imgSrc={{ uri: avatar }}
                contentElement={renderListContent()}
                trailingElement={'2026-09-12'}
                onPress={itemOnPress}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={( item, index ) => `user-${item.id}-${index}`}
                data={chatHistoryList}
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
    listContentContainer: {
        flex: 1,
        flexDirection: 'column',
    }
});

export const buildChatHistoryScreenOptions = (): StackNavigationOptions => {
    return ({
        headerTitle: 'Chat History'
    });
}

export default ChatHistoryScreen;
