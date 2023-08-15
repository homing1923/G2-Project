import { createNativeStackNavigator } from "@react-navigation/native-stack"
import NowPlayingScreen from "./NowPlayingScreen"
import LoginScreen from "./LoginScreen"
import SignUpScreen from "./SignUpScreen"
import MovieDetailScreen from "./MovieDetailScreen"
import BuyTickectScreen from "./BuyTicketScreen"
import { useState, useEffect } from "react"
const Stack = createNativeStackNavigator()

const NowPlayingStack = ({navigation, route}) => {

    return(
        <Stack.Navigator id="Np" initialRouteName="NowPlaying">
            <Stack.Screen name="NowPlaying" component={NowPlayingScreen}></Stack.Screen>
            <Stack.Screen name="Detail" component={MovieDetailScreen}></Stack.Screen>
            <Stack.Screen name="BuyTicket" component={BuyTickectScreen}></Stack.Screen>
            <Stack.Screen name="Login" component={LoginScreen} ></Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default NowPlayingStack