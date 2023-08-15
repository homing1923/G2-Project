import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useState, useEffect } from "react"
import { auth } from "./firestore-config";
import { onAuthStateChanged } from "firebase/auth";
import MyPurchaseScreen from "./MyPurchaseScreen"
import MyPurchaseToLogin from "./MyPurchseToLogin";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import { Alert } from "react-native";
const Stack = createNativeStackNavigator()

const MyPurchaseStack = ({ navigation, route }) => {

    const [loggedInUser, SetloggedInUser] = useState(auth.currentUser)

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (userFromFileAuth) => {
            if (userFromFileAuth) {
                SetloggedInUser(userFromFileAuth.uid)
            } else {
                SetloggedInUser(null)
            }
        })
        return () =>{
            listener()
        } 
    }), []


    return (
        <Stack.Navigator id="Mp" initialRouteName={loggedInUser !== null ? "MyPurchase" : "MyPurchaseToLogin"}>
            {loggedInUser !== null ? (
                <Stack.Screen name="MyPurchase" component={MyPurchaseScreen} />
            ) : (
                <Stack.Screen name="MyPurchaseToLogin" component={MyPurchaseToLogin} />
            )}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>

    )
}

export default MyPurchaseStack