import { memo } from "react"
import { StyleSheet, View } from "react-native";

import ListItem from "../../../components/ListItem";
import Heading from "../../../components/typography/Heading";
import Body from "../../../components/typography/Body";
import useGetReceiverMessagesQuery from "../hooks/useGetReceiverMessagesQuery";

interface ChatHistoryItemProps {
    avatar: string;
    name: string;
    username: string;
    receiverId: string;
    onPress: () => void;
}

const ChatHistoryItem = (props: ChatHistoryItemProps) => {
    const {
        receiverId,
        avatar,
        name,
        username,
        onPress,
    } = props;

    const {
        receiverMessages,
        isLoading,
        isFetching,
    } = useGetReceiverMessagesQuery(receiverId, 1);

    const isLatestMessageLoading = isLoading || isFetching;
    const latestMessageExists = receiverMessages[receiverMessages.length - 1];

    const latestMessage: chat.Message = !isLatestMessageLoading && latestMessageExists
        ? receiverMessages[0]
        : {
            messageId: 'loading-msg',
            message: isLatestMessageLoading ? 'Loading messages' : 'No messages yet',
            createdAt: ''
        }

    const renderListContent = () => {
        return (
            <View style={styles.listContentContainer}>
                <Heading size='medium'>{`${name} | ${username}`}</Heading>
                <Body size="small" numberOfLines={2}>{latestMessage.message}</Body>
            </View>
        );
    }

    return (
        <ListItem
            imgSrc={{ uri: avatar }}
            contentElement={renderListContent()}
            trailingElement={'2026-09-12'}
            onPress={onPress}
        />
    );
}

const styles = StyleSheet.create({
    listContentContainer: {
        flex: 1,
        flexDirection: 'column',
    }
});

export default memo(ChatHistoryItem);