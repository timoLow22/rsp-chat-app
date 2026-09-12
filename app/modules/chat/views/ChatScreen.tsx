import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationOptions, StackNavigationProp } from "@react-navigation/stack";
import { Image, StyleSheet, Text, View } from "react-native";
import { ChatStackParamList } from "../navigation/chatScreens";
import Heading from "../../../components/typography/Heading";
import HeaderIcon from "../../../components/HeaderIcon";
import { ChatNavigationRoutes } from "../navigation/chatNavigationRoutes";
import { SafeAreaView } from "react-native-safe-area-context";

type ChatScreenRouteProp = RouteProp<ChatStackParamList, 'chat'>;

const ChatScreen = () => {
    const { params } = useRoute<ChatScreenRouteProp>();

    return (
        <View style={styles.container}>
           <Text>Chat Screen</Text> 
        </View>
    )
}

export const buildChatScreenOptions = (
    route: RouteProp<ChatStackParamList, 'chat'>,
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
        headerTransparent: true,
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChatScreen;
