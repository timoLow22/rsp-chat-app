import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../settings/views/SettingsScreen";
import { ChatNavigationRoutes } from "../chat/navigation/chatNavigationRoutes";
import ChatScreens, { ChatStackParamList } from "../chat/navigation/chatScreens";
import { NavigatorScreenParams } from "@react-navigation/native";
import { SettingsNavigationRoute } from "../settings/navigation/settingsNavigationRoutes";

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
                component={ChatScreens}
            />
            <AppBottomTab.Screen
                name={SettingsNavigationRoute.SettingsScreen}
                component={SettingsScreen}
            />
        </AppBottomTab.Navigator>
    )
}

export default AppBottomTabNavigator;