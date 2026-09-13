import { RouteProp, StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationOptions, StackNavigationProp } from "@react-navigation/stack";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Heading from "../../../components/typography/Heading";
import Body from "../../../components/typography/Body";
import HeaderIcon from "../../../components/HeaderIcon";

import { ChatStackParamList } from "../navigation/chatScreens";
import useGetReceiverProfileQuery from "../hooks/useGetReceiverProfileQuery";
import { useDispatch, useSelector } from "react-redux";
import ChatUserActions from "../navigation/chatUserActions";
import ChatUserSelectors from "../navigation/chatUserSelectors";
import { useMemo } from "react";

type ChatProfileScreenRouteProp = RouteProp<ChatStackParamList, 'chat/profile'>;

const ChatProfileScreen = () => {
    const { params } = useRoute<ChatProfileScreenRouteProp>();
    const dispatch = useDispatch();
    
    const isUserBlocked = useSelector(ChatUserSelectors.isUserBlocked(params.userId));
    const { userProfiles, isProfileLoading, isError } = useGetReceiverProfileQuery(params.userId);

    const blockButtonConfig = useMemo(() => {
        if (isUserBlocked) {
            return {
                title: 'Unblock',
                onPress: () => dispatch(ChatUserActions.unblock(params.userId)),
                buttonStyle: styles.unblock,
                buttonTextStyle: styles.unblockButtontext,
            }
        }
        
        return {
            title: 'Block',
            onPress: () => dispatch(ChatUserActions.block(params.userId)),
            buttonStyle: styles.block,
                buttonTextStyle: styles.blockButtonText,
        }
    }, [isUserBlocked]);

    if (isProfileLoading) {
        return (
            <View style={styles.container}>
               <Text>Content loading</Text> 
            </View>
        );
    }

    if (!userProfiles.length || isError) {
        return (
            <View style={styles.container}>
               <Text>User profile not found. Try again</Text> 
            </View>
        );
    }

    const { avatar, displayName, headline, bio } = userProfiles[0];

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}
        >
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.contentContainer}>
                    <Image source={{ uri: avatar }} style={styles.avatarContainer} />
                    <Heading
                        size={'large'}
                        style={styles.alignCenter}
                    >
                        {displayName}
                    </Heading>
                    <Body
                        size={'medium'}
                        style={styles.alignCenter}
                    >
                        {headline}
                    </Body>
                    <Body
                        size={'small'}
                        style={styles.alignCenter}
                    >
                        {bio}
                    </Body>
                </View>
                <View>
                    <Pressable
                        onPress={blockButtonConfig.onPress}
                        style={[styles.buttonContainer, blockButtonConfig.buttonStyle]}
                    >
                        <Heading
                            size="medium"
                            style={blockButtonConfig.buttonTextStyle}
                        >
                            {blockButtonConfig.title}
                        </Heading>
                    </Pressable>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export const buildChatProfileScreenOptions = (
    navigation: StackNavigationProp<ChatStackParamList>,
): StackNavigationOptions => {
    const { goBack } = navigation;
    return {
        headerLeft: () => (
            <HeaderIcon
                name={'chevron-left'}
                onPress={() => goBack()}
            />
        ),
        headerTitle: '',
        headerTransparent: true,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeAreaView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        padding: 16,
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    avatarContainer: {
        borderRadius: 50,
        height: 100,
        width: 100,
        marginTop: 8,
        marginBottom: 32, 
    },
    contentContainer: {
        marginTop: 48,
        alignItems: 'center',
    },
    alignCenter: {
        textAlign: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 16,
    },
    block: {
        backgroundColor: '#DD7176',
    },
    unblock: {
        borderColor: '#DD7176',
        borderWidth: 1,
    },
    blockButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
    unblockButtontext: {
        color: '#DD7176',
        textAlign: 'center',
    },
});

export default ChatProfileScreen;
