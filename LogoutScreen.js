import { Pressable, Text, View, Alert, ActivityIndicator } from "react-native"
import { auth } from "./firestore-config"
import Gstyles from "./Gstyle"
import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from "react"

const LogoutScreen = ({ navigation, route }) => {

    const [isLoading, setLoading] = useState(false)

    const logout = () => {
        setLoading(true)
        auth.signOut()
            .then(() => {
                Alert.alert('Goodbye', 'See you again')
            })
            .then(() => {
                setLoading(false)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'NowPlaying' }],
                });
                navigation.navigate('NowPlayingStack', {screen:'NowPlaying'})
            })
            
    }


    return (


        <View style={{ flexDirection: 'column', flex: 1 }}>
            
            {
                (!isLoading) ?
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <Entypo style={{ alignSelf: 'center' }} name="hand" size={30} color="black" />
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 40, padding: 20 }}>{'GoodBye?'}</Text>
                            
                        </View>
                    {(isLoading) ? <View style={{flex:1}}>
                        
                    </View> : null}
                    
                        <Pressable style={{ flex: 7, justifyContent: 'center' }} onPress={() => {
                            logout()

                        }}>
                            <Text style={Gstyles.signupbtn}> {'Sign Out'}</Text>
                        </Pressable>
                    </View >

                    :
                    <View style={{flex:1}}>
                        <ActivityIndicator  animating={true} size="large" />
                    </View>
            }
        </View>


    )
}

export default LogoutScreen