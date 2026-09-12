import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import useGetProfileQuery from "../../../profile/hooks/useGetProfileQuery";
import { SafeAreaView } from "react-native-safe-area-context";
import Heading from "../../../components/typography/Heading";
import Body from "../../../components/typography/Body";
import DeviceInfo from "react-native-device-info";

const SettingsScreen = () => {
    const { profileData } = useGetProfileQuery();

    const { avatar, name, username } = profileData;

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
                        {name}
                    </Heading>
                    <Body
                        size={'medium'}
                        style={styles.alignCenter}
                    >
                        {username}
                    </Body>
                </View>
                <Body size={'small'}>{`Build number: ${DeviceInfo.getBuildNumber()}`}</Body>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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

export default SettingsScreen;
