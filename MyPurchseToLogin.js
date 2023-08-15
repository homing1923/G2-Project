import { Pressable, Text, View } from "react-native"
import Gstyles from "./Gstyle"

const MyPurchaseToLogin = ({route, navigation}) =>{
    return(
        <View>
            <Text style={Gstyles.listtitle}>{'Your Ticket'}</Text>
            <Text style={Gstyles.inputStyle}> {'You have to Login to use this feature'} </Text>
            <Pressable onPress={() => {
                  navigation.navigate('Login', {selectedItem:{}});
                }}>
            <Text style={Gstyles.loginbtn}> {'Login'} </Text>
            </Pressable>
        </View>
    )
}

export default MyPurchaseToLogin