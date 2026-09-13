import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute, NavigatorScreenParams } from "@react-navigation/native";
import FontAwesome, { FontAwesomeIconName } from "@react-native-vector-icons/fontawesome";

import SettingsScreen from "../settings/views/SettingsScreen";
import { ChatNavigationRoutes } from "../chat/navigation/chatNavigationRoutes";
import ChatScreens, { ChatStackParamList } from "../chat/navigation/chatScreens";
import { SettingsNavigationRoute } from "../settings/navigation/settingsNavigationRoutes";
import useGetProfileQuery from "../../profile/hooks/useGetProfileQuery";

export type AppBottomTabParamList = {
    [ChatNavigationRoutes.ChatStack]: NavigatorScreenParams<ChatStackParamList>;
    [SettingsNavigationRoute.SettingsScreen]: undefined;
}

const AppBottomTab = createBottomTabNavigator<AppBottomTabParamList>();

const AppBottomTabNavigator = () => {
    useGetProfileQuery();

    return (
        <AppBottomTab.Navigator
            initialRouteName={ChatNavigationRoutes.ChatStack}
            screenOptions={{ headerShown: false }}
        >
            <AppBottomTab.Screen
                name={ChatNavigationRoutes.ChatStack}
                options={({ route }) => {
                    const currentActiveStackRoute = getFocusedRouteNameFromRoute(route);

                    const screensToHideTabs = [
                        ChatNavigationRoutes.ChatViewScreen,
                        ChatNavigationRoutes.ChatProfile,
                    ] as string[];

                    const shouldHideTabs = currentActiveStackRoute
                        && screensToHideTabs.includes(currentActiveStackRoute)

                    return {
                        tabBarIcon: ({ color, size, focused }) => {
                            const chatIconName: FontAwesomeIconName = focused ? 'comment' : 'comment-o'
    
                            return <FontAwesome name={chatIconName} size={size} color={color} />
                        },
                        tabBarStyle: {
                            display: shouldHideTabs ? 'none' : undefined,
                        },
                        tabBarLabel: 'Chats'
                    }
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