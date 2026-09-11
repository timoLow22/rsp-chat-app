import { createStackNavigator } from "@react-navigation/stack";

import { ChatNavigationRoutes } from "./chatNavigationRoutes";
import ChatHistoryScreen from "../views/ChatHistoryScreen";
import ChatScreen from "../views/ChatScreen";
import ChatProfileScreen from "../views/ChatProfileScreen";

export type ChatStackParamList = {
    [ChatNavigationRoutes.ChatHistoryScreen]: undefined;
    [ChatNavigationRoutes.ChatScreen]: chat.ChatRouteParams;
    [ChatNavigationRoutes.ChatProfile]: undefined;
}

const ChatStack = createStackNavigator<ChatStackParamList>();

const ChatScreens = () => {
    return (
        <ChatStack.Navigator initialRouteName={ChatNavigationRoutes.ChatHistoryScreen}>
            <ChatStack.Screen
                name={ChatNavigationRoutes.ChatHistoryScreen}
                component={ChatHistoryScreen}
            />
            <ChatStack.Screen
                name={ChatNavigationRoutes.ChatScreen}
                component={ChatScreen}
            />
            <ChatStack.Screen
                name={ChatNavigationRoutes.ChatProfile}
                component={ChatProfileScreen}
            />
        </ChatStack.Navigator>
    )
}

export default ChatScreens;