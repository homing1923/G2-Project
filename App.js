import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import TabScreen from './Tab';
import { IdProvider } from './Provider';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <RootSiblingParent>
      <IdProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Tab'>
            <Stack.Screen name="Tab" component={TabScreen} options={{ headerShown: false }}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </IdProvider>
    </RootSiblingParent>
  );
}


