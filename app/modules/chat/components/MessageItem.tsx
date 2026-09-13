import FontAwesome, { FontAwesomeIconName } from "@react-native-vector-icons/fontawesome";
import { StyleSheet, View } from "react-native";

import Body from "../../../components/typography/Body";

const MessageItem = (props: chat.Message) => {
    const { message, status } = props;

    const isSender = !!status;

    const messageContainerType = isSender
        ? 'sender'
        : 'receiver';

    const statusIconName: FontAwesomeIconName = status === 'sent'
        ? 'check-circle'
        : 'check-circle-o'

    const renderStatus = () => (
        <View style={styles.statusContainer}>
            <FontAwesome name={statusIconName} />
        </View>
    );

    return (
        <View
            style={[styles.container, styles[messageContainerType]]}
        >
            <View style={styles.messageContainer}>
                <Body size={'small'}>
                    {message}
                </Body>
            </View>
            {isSender && renderStatus()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    receiver: {
        backgroundColor: '#98AFC7',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 16,
        alignSelf: 'flex-start',
    },
    sender: {
        backgroundColor: '#DBE2E9',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        alignSelf: 'flex-end',
    },
    messageContainer: {
        padding: 16,
    },
    statusContainer: {
        paddingRight: 16,
        justifyContent: 'flex-end',
        paddingBottom: 8,
    },
});

export default MessageItem;
