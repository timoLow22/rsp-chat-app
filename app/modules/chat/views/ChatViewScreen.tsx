import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationOptions, StackNavigationProp } from "@react-navigation/stack";
import { Button, FlatList, Image, KeyboardAvoidingView, ListRenderItem, Platform, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Heading from "../../../components/typography/Heading";
import HeaderIcon from "../../../components/HeaderIcon";
import Body from "../../../components/typography/Body";

import { ChatStackParamList } from "../navigation/chatScreens";
import { ChatNavigationRoutes } from "../navigation/chatNavigationRoutes";
import useChatView from "../hooks/useChatView";
import MessageItem from "../components/MessageItem";

type ChatViewScreenRouteProp = RouteProp<ChatStackParamList, 'chat/view'>;

const ChatViewScreen = () => {
    const { params } = useRoute<ChatViewScreenRouteProp>();
    const {
        chatMessages,
        messageText,
        isReceiverBlocked,
        isPending,
        setMessageText,
        sendMessage,
    } = useChatView(params.userId ?? '');

    const renderChatMessageItems: ListRenderItem<chat.Message>  = ({ item }) => (
        MessageItem(item)
    );

    const renderBottomArea = () => {
        if (isReceiverBlocked) {
            return (
                <Body
                    size={'small'}
                    style={styles.blockedUserText}
                >
                    {'User is blocked. You are unable to send messages to this user.'}
                </Body>
            );
        }

        return (
            <>
                <TextInput
                    value={messageText}
                    onChangeText={setMessageText}
                    style={styles.input}
                    placeholder='Type a message...'
                    placeholderTextColor={'#5B616B'}
                />
                {/* TODO: Replace with IconButton */}
                <Button
                    title={'Send'}
                    disabled={!messageText.trim() || isPending}
                    onPress={sendMessage}
                />
            </>
        )
    }

    return (
        <SafeAreaView edges={['bottom']} style={styles.safeAreaContainer}>
            <KeyboardAvoidingView
                behavior={'padding'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 130}
                style={styles.chatContainer}
            >
                <View style={styles.innerContent}>
                    <FlatList
                        inverted={true}
                        data={chatMessages}
                        keyExtractor={(item, index) => `${item.messageId}-${index}`}
                        renderItem={renderChatMessageItems}
                    />
                    <View style={styles.bottomInputContainer}>
                        {renderBottomArea()}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export const buildChatViewScreenOptions = (
    route: RouteProp<ChatStackParamList, 'chat/view'>,
    navigation: StackNavigationProp<ChatStackParamList>,
): StackNavigationOptions => {
    const { userId, avatar, username } = route.params;
    const { navigate, goBack } = navigation;

    return ({
        header: () => {
            return (
                <View>
                    <SafeAreaView   
                        style={styles.safeAreaHeaderContainer}
                        edges={['top', 'left', 'right']}
                    >
                        <HeaderIcon
                            name={'chevron-left'}
                            onPress={() => goBack()}
                        />
                        <View style={styles.headerContainer}>
                            <Image source={{ uri: avatar }} style={styles.avatarContainer} />
                            <Heading size={'medium'}>
                                {username}
                            </Heading>
                        </View>
                        <HeaderIcon
                            position={'right'}
                            size={24}
                            name={'ellipsis-v'}
                            onPress={() => navigate(ChatNavigationRoutes.ChatProfile, {
                                userId
                            })}
                        />
                    </SafeAreaView>
                    <View style={{ height: 1, backgroundColor: '#E0E0E0'}}/>
                </View>
            );
        },
    });
}

const styles = StyleSheet.create({
    safeAreaHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8,
    },
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    avatarContainer: {
        borderRadius: 50,
        height: 50,
        width: 50,
        marginBottom: 8,
    },
    safeAreaContainer: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
    },
    innerContent: {
        flex: 1,
        paddingHorizontal: 16,
    },
    bottomInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        height: 50,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        marginRight: 8,
        paddingHorizontal: 16,
    },
    blockedUserText: {
        textAlign: 'center',
        color: '#636363'
    }
});

export default ChatViewScreen;
