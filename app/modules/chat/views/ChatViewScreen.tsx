import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationOptions, StackNavigationProp } from "@react-navigation/stack";
import { Image, StyleSheet, View } from "react-native";
import { ChatStackParamList } from "../navigation/chatScreens";
import Heading from "../../../components/typography/Heading";
import HeaderIcon from "../../../components/HeaderIcon";
import { ChatNavigationRoutes } from "../navigation/chatNavigationRoutes";
import { SafeAreaView } from "react-native-safe-area-context";
import useGetReceiverMessagesQuery from "../hooks/useGetReceiverMessagesQuery";
import { FlatList } from "react-native-gesture-handler";
import Body from "../../../components/typography/Body";

type ChatViewScreenRouteProp = RouteProp<ChatStackParamList, 'chat/view'>;

const ChatViewScreen = () => {
    const { params } = useRoute<ChatViewScreenRouteProp>();
    const { receiverMessages } = useGetReceiverMessagesQuery(params.userId);

    return (
        <View style={styles.chatContainer}>
            <FlatList
                data={receiverMessages}
                keyExtractor={(item, index) => `${item.messageId}-${index}`}
                renderItem={({ item }) => <Body size={'medium'}>{item.message}</Body>}
            />
        </View>
    )
}

export const buildChatViewScreenOptions = (
    route: RouteProp<ChatStackParamList, 'chat/view'>,
    navigation: StackNavigationProp<ChatStackParamList>,
): StackNavigationOptions => {
    const { avatar, username } = route.params;
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
                            onPress={() => navigate(ChatNavigationRoutes.ChatProfile)}
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
    chatContainer: {
        flex: 1,
        padding: 16,
    },
});

export default ChatViewScreen;
