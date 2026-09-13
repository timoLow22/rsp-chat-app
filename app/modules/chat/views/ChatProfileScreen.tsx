import { RouteProp, StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationOptions, StackNavigationProp } from "@react-navigation/stack";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Heading from "../../../components/typography/Heading";
import Body from "../../../components/typography/Body";
import HeaderIcon from "../../../components/HeaderIcon";

import { ChatStackParamList } from "../navigation/chatScreens";
import useGetReceiverProfileQuery from "../hooks/useGetReceiverProfileQuery";

type ChatProfileScreenRouteProp = RouteProp<ChatStackParamList, 'chat/profile'>;

const ChatProfileScreen = () => {
    const { params } = useRoute<ChatProfileScreenRouteProp>();
    const navigation = useNavigation();
    const { userProfiles, isProfileLoading, isError } = useGetReceiverProfileQuery(params.userId);

    if (isProfileLoading) {
        return (
            <View style={styles.container}>
               <Text>Content loading: Build placeholder shimmer later</Text> 
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
                <Image source={{ uri: avatar }} style={styles.avatarContainer} />
                <View style={styles.contentContainer}>
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
                </View>
                <Body
                    size={'small'}
                    style={styles.alignCenter}
                >
                    {bio}
                </Body>
                <Button title="Block" onPress={() => navigation.dispatch(StackActions.popToTop)}/>
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
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 16,
    },
    alignCenter: {
        textAlign: 'center',
    }
});

export default ChatProfileScreen;
