import { StatusBar } from 'expo-status-bar';
import { Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NowPlayingStack from './NowPlayingStack';
import MyPuchaseStack from './MyPurchaseStack';
import LogoutScreen from './LogoutScreen';
import Gstyles from './Gstyle';
import { useEffect, useState } from 'react';
import { async } from '@firebase/util';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from "firebase/auth";
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
// import { Icon } from '@expo/vector-icons/Ionicons'
import Icon from '@expo/vector-icons/FontAwesome'
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { auth } from "./firestore-config";

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const TabScreen = ({navigation, route}) => {
  const [loggedInUser, SetloggedInUser] = useState(auth.currentUser)

  useEffect(() =>{
    const listener = onAuthStateChanged(auth, (userFromFileAuth) => {
        if(userFromFileAuth){
            SetloggedInUser(userFromFileAuth.uid)
        }else{ 
            SetloggedInUser(null)
        }
    })
    return listener
}),[]
  return (

      <Tab.Navigator initialRouteName='NowPlayingStack' screenOptions={ ({route}) => ({
        "tabBarActiveTintColor" : 'orangered',
        "tabBarInactiveTintColor" : 'gray',
        "tabBarStyle" : [{"display" : "flex"}, null],
        "tabBarIcon": ( {focused, color, size} ) => {
            let iconName;

            if (route.name === "NowPlayingStack"){
                iconName = focused ? 'list' : 'bars';
                return <Icon name={iconName} size={size} color={color}/>
            }else if (route.name === "MyPurchaseStack"){
                iconName = focused ? 'heart' : 'heart-o'
                return <Icon name={iconName} size={size} color={color}/>
            }else if (route.name === "Logout"){
                return  focused ? <FontAwesome name={'arrow-right'} size={size} color={color}/> : <FontAwesome5 name={'sign-out-alt'} size={size} color={color}/>; 
            }


        }
    }) }>
        <Tab.Screen name="NowPlayingStack" component={NowPlayingStack}  options={{headerShown:false}} />
        <Tab.Screen name="MyPurchaseStack" component={MyPuchaseStack} options={{headerShown:false}}/>
        {(loggedInUser !== null) ? <Tab.Screen name="Logout" component={LogoutScreen} /> : null}
      </Tab.Navigator>

  );
}

export default TabScreen
