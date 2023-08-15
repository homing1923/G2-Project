import { View, TextInput, Text, Pressable, Alert, ImageBackground, Switch } from "react-native"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, store } from "./firestore-config";
import { collection, query, getDocs, where, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useG_uDocId, useG_authId } from "./Provider";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gstyles from "./Gstyle";


const LoginScreen = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [saveUsername, setsaveUsername] = useState(false)
    const { SetuDocId } = useG_uDocId()
    const { SetauthId } = useG_authId()
    const { selectedItem } = route.params

    useEffect(() => {
        getData()
    }, [])

    const toggleSwitch = () => setsaveUsername(previousState => !previousState);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_username')
            const value2 = await AsyncStorage.getItem('@storage_savebtnstate')
            if (value !== null) {
                setUsername(value)
            }
            if (value2 !== null) {
                setsaveUsername((value2 === 'true') ? true : false )
            }
        } catch (e) {
            console.log(e)
        }
    }

    const storeData = async (storeageName, value) => {
        try {
            await AsyncStorage.setItem(storeageName, value.toString())
        } catch (e) {
            console.log(e)
        }
    }

    const onSignInClicked = () => {
        //auth
        signInWithEmailAndPassword(auth, username, password)
            .then((userCred) => {
                Alert.alert('login success', `hello, ${userCred.user.email}`)
                SetauthId(userCred.user.uid)
                return userCred.user.uid
            })
            .then((authid) => {
                getInfo(authid)
            })
            .then(() => {
                saveUsername ? storeData('@storage_username', username) : storeData('@storage_username', '')
            })
            .then(() => {
                storeData('@storage_savebtnstate', saveUsername)
            })
            .catch(err => {
                Alert.alert('cannot login', `failed due to reason ${err}`)
            })
    }

    const onSignUpClicked = () => {
        //go to sign up screen
        const p = navigation.getId()
        if (p === 'Np') {
            navigation.navigate('NowPlayingStack', { screen: 'SignUp', params: { selectedItem: selectedItem } });
        } else {
            navigation.navigate('MyPurchaseStack', { screen: 'SignUp', params: { selectedItem: selectedItem } });
        }

    }

    const getInfo = async () => {
        const collectionRef = collection(store, "movieDb");
        const filter = where("email", "==", username);
        const q = query(collectionRef, filter);
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs;
        var refId = ''
        if (documents.length > 0) {
            console.log(`find user: number of ${documents.length} , first id = ${documents[0].id}`)
            refId = documents[0].id
        } else {
            console.log(`new user from old version`)
            const newprofile = { email: auth.currentUser.email }
            const newProfileDocRef = await addDoc(collectionRef, newprofile)
            refId = newProfileDocRef.id
        }
        SetuDocId(refId)
        const p = navigation.getId()
        if (p === 'Np') {
            navigation.navigate('NowPlayingStack', { screen: 'Detail', params: { selectedItem: selectedItem } })
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'MyPurchase' }],
            });
            navigation.navigate('MyPurchaseStack', { screen: 'MyPurchase', params: { selectedItem: selectedItem }, merge: true });
        }
    }

    return (
        <ImageBackground style={Gstyles.loginbg} source={{ uri: `https://image.tmdb.org/t/p/w500${selectedItem.poster_path}` }} resizeMode="cover" imageStyle={{ opacity: 0.15 }}>


            <View style={Gstyles.logincontainer}>
                <Text> {'Username'} </Text>
                <TextInput
                    style={Gstyles.inputStyle}
                    placeholder="enter username"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    returnKeyType="next"
                    secureTextEntry={false}
                    value={username}
                    onChangeText={setUsername}
                />
                <Text> {'Password'} </Text>
                <TextInput
                    style={Gstyles.inputStyle}
                    placeholder="enter password"
                    textContentType="password"
                    autoCapitalize="none"
                    returnKeyType="next"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <Text>{'Save username?'}</Text>
                <Switch value={saveUsername} onValueChange={toggleSwitch} />
                <Pressable style={Gstyles.loginbtn} onPress={onSignInClicked}>
                    <Text style={Gstyles.buttonTextStyle}>Sign In</Text>
                </Pressable>

                <Pressable style={Gstyles.signupbtn} onPress={onSignUpClicked}>
                    <Text style={Gstyles.buttonTextStyle}>Sign Up</Text>
                    <LinearGradient colors={[(selectedItem.vote_average > 8) ? 'green' : (selectedItem.vote_average > 6) ? 'blue' : 'red', 'black']} style={{ flex: 1 }} />
                </Pressable>

            </View>
        </ImageBackground>
    )
}

export default LoginScreen