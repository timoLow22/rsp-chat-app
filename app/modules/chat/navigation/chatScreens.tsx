import { createStackNavigator } from "@react-navigation/stack";

import { ChatNavigationRoutes } from "./chatNavigationRoutes";
import ChatHistoryScreen, { buildChatHistoryScreenOptions } from "../views/ChatHistoryScreen";
import ChatViewScreen, { buildChatViewScreenOptions } from "../views/ChatViewScreen";
import ChatProfileScreen from "../views/ChatProfileScreen";

export type ChatStackParamList = {
    [ChatNavigationRoutes.ChatHistoryScreen]: undefined;
    [ChatNavigationRoutes.ChatViewScreen]: chat.ChatViewRouteParams;
    [ChatNavigationRoutes.ChatProfile]: undefined;
}

const ChatStack = createStackNavigator<ChatStackParamList>();

const ChatScreens = () => {
    return (
        <ChatStack.Navigator initialRouteName={ChatNavigationRoutes.ChatHistoryScreen}>
            <ChatStack.Screen
                name={ChatNavigationRoutes.ChatHistoryScreen}
                component={ChatHistoryScreen}
                options={buildChatHistoryScreenOptions()}
            />
            <ChatStack.Screen
                name={ChatNavigationRoutes.ChatViewScreen}
                options={({ route, navigation }) => buildChatViewScreenOptions(route, navigation)}
                component={ChatViewScreen}
            />
            <ChatStack.Screen
                name={ChatNavigationRoutes.ChatProfile}
                component={ChatProfileScreen}
            />
        </ChatStack.Navigator>
    )
}

export default ChatScreens;