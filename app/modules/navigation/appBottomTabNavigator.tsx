import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../settings/views/SettingsScreen";
import { ChatNavigationRoutes } from "../chat/navigation/chatNavigationRoutes";
import ChatScreens, { ChatStackParamList } from "../chat/navigation/chatScreens";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { SettingsNavigationRoute } from "../settings/navigation/settingsNavigationRoutes";
import FontAwesome, { FontAwesomeIconName } from "@react-native-vector-icons/fontawesome";

export type AppBottomTabParamList = {
    [ChatNavigationRoutes.ChatStack]: NavigatorScreenParams<ChatStackParamList>;
    [SettingsNavigationRoute.SettingsScreen]: undefined;
}

const AppBottomTab = createBottomTabNavigator<AppBottomTabParamList>();

const AppBottomTabNavigator = () => {
    return (
        <AppBottomTab.Navigator
            initialRouteName={ChatNavigationRoutes.ChatStack}
            screenOptions={{ headerShown: false }}
        >
            <AppBottomTab.Screen
                name={ChatNavigationRoutes.ChatStack}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        const chatIconName: FontAwesomeIconName = focused ? 'comment' : 'comment-o'

                        return <FontAwesome name={chatIconName} size={size} color={color} />
                    },
                    tabBarLabel: 'Chats'
                }}
                component={ChatScreens}
            />
            <AppBottomTab.Screen
                name={SettingsNavigationRoute.SettingsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name={'gear'} size={size} color={color} />
                    },
                    tabBarLabel: 'Settings'
                }}
                component={SettingsScreen}
            />
        </AppBottomTab.Navigator>
    )
}

export default AppBottomTabNavigator;