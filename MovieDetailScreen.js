import { useState, useEffect } from "react"
import { auth } from "./firestore-config";
import { onAuthStateChanged } from "firebase/auth";
import { View, Pressable, Text, Image, ImageBackground, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view'
import Gstyles from "./Gstyle";
import Toast from 'react-native-root-toast';

const MovieDetailScreen = ({ navigation, route }) => {

    const { selectedItem } = route.params

    const [loggedInUser, SetloggedInUser] = useState(auth.currentUser)

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (userFromFileAuth) => {
            if (userFromFileAuth) {
                SetloggedInUser(userFromFileAuth.email)
            } else {
                SetloggedInUser(null)
            }
        })
        return () =>{
            listener()
        } 
    }), []

    const createToast = () => {
        let toast = Toast.show('You have to login to continue', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
        
        // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
        setTimeout(function () {
            Toast.hide(toast);
        }, 2000);
    }

    return (
        <View>
            <ImageBackground style={Gstyles.detailbg} source={{ uri: `https://image.tmdb.org/t/p/w500${selectedItem.poster_path}` }} resizeMode="cover" imageStyle={{ opacity: 0.15 }}>
                <View style={Gstyles.detailmaincontainer}>
                    <Image style={Gstyles.detailimg} source={{ uri: `https://image.tmdb.org/t/p/original${selectedItem.backdrop_path}` }} resizeMode="center" />
                    <View style={Gstyles.detaildesccontainer}>
                        <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 10 }}>
                            <View style={{ width: '80%' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }} >{selectedItem.original_title}</Text>
                                <Text>{selectedItem.release_date}</Text>
                            </View>
                            <View style={{ width: '20%' }}>
                                <MaskedView
                                    style={{ flex: 1, flexDirection: 'row', height: 'auto', marginTop: 8 }}
                                    maskElement={
                                        <View style={{
                                            backgroundColor: 'transparent', justifyContent: 'center',
                                            alignItems: 'center',
                                        }} >
                                            <AntDesign name={'star'} size={40} color={`#FFDEA4`} />
                                            <Text>{selectedItem.vote_average.toFixed(1)}</Text>
                                        </View>
                                    }>
                                    <LinearGradient colors={[(selectedItem.vote_average > 8) ? 'green' : (selectedItem.vote_average > 6) ? 'blue' : 'red', 'black']} style={{ flex: 1 }} />
                                </MaskedView>
                            </View>
                        </View>
                        <View style={{ flex: 3, backgroundColor: '#FFDEA460', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>{'Summary'}</Text>
                            <Text>{selectedItem.overview}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>

                        {(loggedInUser !== null) ?
                            <View>
                                <Pressable onPress={() => {
                                    navigation.navigate('BuyTicket', { selectedItem: selectedItem, Uemail:loggedInUser})
                                }}>
                                    <Text style={Gstyles.loginedbuybtn}> {'BuyTicket'} </Text>
                                </Pressable>
                            </View>
                            :
                            <View>
                                <Text style={{ textAlign: 'center' }}> {'Feature Locked'} </Text>
                                <Pressable onPress={() =>{
                                    createToast()
                                }}>
                                    <Text style={Gstyles.tobuybtn}> {'BuyTicket'} </Text>
                                </Pressable>
                                <Pressable onPress={() => {
                                    navigation.navigate('Login', { selectedItem: selectedItem })
                                }}>

                                    <Text style={Gstyles.loginorsignupbtn}> {'Login Or SingUp'} </Text>
                                </Pressable>
                            </View>
                        }
                    </View>

                </View>



            </ImageBackground>
        </View>
    )
}

export default MovieDetailScreen