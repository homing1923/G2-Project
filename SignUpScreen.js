import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable,  Alert } from "react-native";
import { store, auth } from "./firestore-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useG_uDocId, useG_authId } from "./Provider";
import Gstyles from "./Gstyle";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation, route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmPassword] = useState('');
    const [userCredential, setuserCredential] = useState()

    const [EmailError, setEmailError] = useState(false);
    const [EmailErrorT, setEmailErrorT] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorT, setPasswordErrorT] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorT, setConfirmPasswordErrorT] = useState('');
    const { selectedItem } = route.params
    const { SetuDocId } = useG_uDocId()
    const { SetauthId } = useG_authId()


    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_username', value)
        } catch (e) {
            // saving error
        }
    }
    // event handlers
    const onCreateAccountPressed = async () => {
        console.log('pressed')
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, username, password)
                .then(cd => {
                    setuserCredential(userCredential)
                    Alert.alert('Welcome!', `${cd.user.email}`)
                    SetauthId(cd.user.uid)
                    storeData(cd.user.email)
                    console.log(`${cd.user.email} , ${cd.user.uid} is created in!`)
                })
                .then(() => {
                    afterAccountCreated()
                })
        }
        catch (err) {
            console.log(err)
            Alert.alert('Fail!', `'reason: ${err}'`)
        }
    }

    const handleEmailBlur = () => {
        if (!username) {
            setEmailErrorT('Empty Email')
            setEmailError(true)
            return
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(username)) {
            setEmailErrorT('Invalid Email Format')
            setEmailError(true);
            return
        }
        setEmailError(false);
    };

    const handlePasswordBlur = () => {
        if (!password) {
            setPasswordErrorT('Empty Password')
            setPasswordError(true);
            return
        } else if (password.length < 6) {
            setPasswordError(true);
            setPasswordErrorT("Password must be at least 6 characters long");
            return
        } else {
            setPasswordError(false);
        }
    };

    const handleConfirmPasswordBlur = () => {
        if (!confirmpassword) {
            setConfirmPasswordErrorT('Empty Confirm Password')
            setConfirmPasswordError(true);
            return
        } else if (confirmpassword !== password) {
            setConfirmPasswordErrorT("Passwords do not match")
            setConfirmPasswordError(true);
            return
        } else {
            setConfirmPasswordError(false);
        }
    };

    const afterAccountCreated = async () => {
        const newUserInfo = {
            email: username
        }
        try {
            await addDoc(collection(store, "movieDb"), newUserInfo)
                .then(dRef => {
                    console.log(`${dRef.id} info sheet is created !`)
                    SetuDocId(dRef.id)
                    const p = navigation.getId()
                    console.log(p)
                    if (p === 'Np') {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'NowPlaying' }],
                        });
                        navigation.navigate('NowPlayingStack', { screen:'Detail', params:{ selectedItem: selectedItem }});
                    } else {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'MyPurchase' }],
                        });
                        navigation.navigate('MyPurchaseStack', { screen:'MyPurchase', params:{selectedItem: selectedItem }});
                    }
                })

        }
        catch (err) {
            Alert.alert('Fail!', `'reason: ${err}'`)
        }
    }

    return (
        <View style={Gstyles.signupcontainer}>
            <View style={{ marginBottom: 20 }}>
                <Text> {'Username'} </Text>
                <TextInput
                    style={[Gstyles.inputStyle, EmailError && { backgroundColor: '#AA000050' }]}
                    placeholder="Enter Username"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    returnKeyType="next"
                    onBlur={handleEmailBlur}
                    value={username}
                    onChangeText={setUsername}
                />
                {EmailError ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AntDesign name="exclamationcircle" size={24} color="red" />
                        <Text>{`  ${EmailErrorT}`}</Text>
                    </View>
                    : null}
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text> {'Password'} </Text>
                <TextInput
                    style={[Gstyles.inputStyle, passwordError && { backgroundColor: '#AA000050' }]}
                    placeholder="Enter Password"
                    textContentType="password"
                    autoCapitalize="none"
                    returnKeyType="done"
                    secureTextEntry={true}
                    value={password}
                    onBlur={handlePasswordBlur}
                    onChangeText={setPassword}
                />
                {passwordError ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AntDesign name="exclamationcircle" size={24} color="red" />
                        <Text>{`  ${passwordErrorT}`}</Text>
                    </View>
                    : null}
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text> {'Confirm Password'} </Text>
                <TextInput
                    style={[Gstyles.inputStyle, confirmPasswordError && { backgroundColor: '#AA000050' }]}
                    placeholder="Enter Confirm Password"
                    textContentType="password"
                    autoCapitalize="none"
                    returnKeyType="done"
                    secureTextEntry={true}
                    value={confirmpassword}
                    onBlur={handleConfirmPasswordBlur}
                    onChangeText={setconfirmPassword}
                />
                {confirmPasswordError ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AntDesign name="exclamationcircle" size={24} color="red" />
                        <Text>{`  ${confirmPasswordErrorT}`}</Text>
                    </View>
                    : null}
            </View>

            {(EmailError || passwordError || confirmPasswordError) ? <Pressable onPress={() => {console.log('No this one')}}
            style={[Gstyles.loginbtn, (EmailError || passwordError || confirmPasswordError) && { backgroundColor: '#20000050' }]}>
                <Text style={Gstyles.buttonTextStyle}>Create Account</Text>
            </Pressable> : <Pressable style={Gstyles.loginbtn} onPress={onCreateAccountPressed}>
                <Text style={Gstyles.buttonTextStyle}>Create Account</Text>
            </Pressable>}
        </View>
    )
}

export default SignUpScreen