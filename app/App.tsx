import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { globalStore } from './modules/main/globalStore';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppBottomTabNavigator from './modules/navigation/appBottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={globalStore}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar barStyle={'dark-content'} />
          <NavigationContainer>
            <AppBottomTabNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
