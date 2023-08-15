import { Text, View, Button, TextInput, Pressable, Alert, ImageBackground } from "react-native"
import { store, auth } from "./firestore-config"
import { collection, addDoc } from "firebase/firestore"
import { useG_uDocId, useG_authId, useG_lastId } from "./Provider";
import Gstyles from "./Gstyle"
import { useEffect, useState } from "react"

const BuyTickectScreen = ({ navigation, route }) => {
    const { selectedItem, Uemail } = route.params
    const { uDocId } = useG_uDocId()
    const { authId } = useG_authId()
    const { SetlastId } = useG_lastId()
    const [numberofticket, Setnumberofticket] = useState(0)
    const [email, Setemail] = useState('')
    const [name, Setname] = useState('')
    const [total, SetTotal] = useState('')
    const [tax, SetTax] = useState('')
    const [pretaxtotal, SetpretaxTotal] = useState('')

    useEffect(() => {
        Setemail(Uemail)
    }, [Uemail])

    useEffect(() => {
        calc()
    }, [numberofticket])

    const addPress = () => {
        Setnumberofticket(numberofticket + 1)
    }

    const minusPress = () => {
        if (numberofticket > 0) {
            Setnumberofticket(numberofticket - 1)
        }
    }

    const calc = () => {
        const unitPrice = 12
        const tax = 0.13
        const temp_pretaxtotal = numberofticket * unitPrice
        const temp_tax = temp_pretaxtotal * tax
        const temp_total = temp_pretaxtotal + temp_tax
        SetpretaxTotal(temp_pretaxtotal.toFixed())
        SetTax((temp_tax).toFixed(2))
        SetTotal((temp_total).toFixed(2))
    }

    const createRecord = async () => {
        console.log('Creating Doc...')
        const subCollection = collection(store, 'movieDb', uDocId, "tickets")
        console.log(`created sub Doc path...authuid = ${authId}`)
        try {
            const newTicket = { email: email, name: name, movieId: selectedItem.id, movieName: selectedItem.original_title, uAuthId: authId, NumberOfTicket: numberofticket, total: total, timestamp: Date.now().toString() }
            const newTicketDocRef = await addDoc(subCollection, newTicket)
            console.log(`Created New Ticket Ref, id = ${newTicketDocRef.id}`)
            SetlastId(newTicketDocRef.id)
            Alert.alert("Created!", "New Ticket!")
            navigation.popToTop()
        } catch (err) {
            Alert.alert('Error Occur', `${err}`)
            console.Console(`Error@createRecord: ${err}`)
        }

    }

    const InfoRow = ({ title, value, backgroundColor, textColor }) => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', padding: 10, backgroundColor: backgroundColor }}>
                <Text style={{ width: '30%', color: textColor }}>{title}</Text>
                <Text style={{ width: '70%', color: textColor }}>{value}</Text>
            </View>
        )
    }

    return (
        <ImageBackground style={Gstyles.buybg} source={{ uri: `https://image.tmdb.org/t/p/w500${selectedItem.poster_path}` }} resizeMode="cover" imageStyle={{ opacity: 0.15 }}>
            <View style={Gstyles.buymaincontainer}>
                <View style={Gstyles.buytitlesection}>
                    <Text style={Gstyles.buytitle}> {'Buy Tickets'} </Text>
                    <Text style={Gstyles.buytitletext}>{selectedItem.original_title}</Text>
                </View>

                <View style={Gstyles.buyinputcontainer}>
                    <Text>{'Your Email'}</Text>
                    <TextInput style={Gstyles.buytextinput} placeholder="Enter Your Email" keyboardType='email-address' value={email} onChangeText={(v) => { Setemail(v) }} />
                </View>


                <View style={Gstyles.buyinputcontainer}>
                    <Text>{'Your Name'}</Text>
                    <TextInput style={Gstyles.buytextinput} placeholder="Enter Your Name" keyboardType='default' onChangeText={(v) => { Setname(v) }} />
                </View>
                <Text style={{ textAlign: 'center' }}>{'Number of Ticket'}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center', flex: 1 }}>
                    <Button style={{}} onPress={() => { minusPress() }} title={'-'} />
                    <Text style={{ fontSize: 28 }}>{`${numberofticket}`}</Text>
                    <Button style={{}} onPress={() => { addPress() }} title={'+'} />
                </View>
                {numberofticket > 0 ?
                    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', flex: 5, padding: 10, margin: 20, backgroundColor: '#AF6F0040', borderRadius: 5, }}>
                        <Text style={{ flex: 1, fontWeight: 'bold' }}>{`Ticket Summary`}</Text>
                        <View style={{ flex: 5, alignItems: 'center' }}>
                            <InfoRow title="Movie Title:" value={selectedItem.original_title} backgroundColor="#09C3A450" textColor="#000" />
                            <InfoRow title="Number of ticket:" value={numberofticket} backgroundColor="#09C3A420" textColor="#000" />
                            <InfoRow title="PreTax:" value={`$${pretaxtotal}`} backgroundColor="#09C3A420" textColor="#000" />
                            <InfoRow title="Tax:" value={`$${tax}`} backgroundColor="#09C3A420" textColor="#000" />
                            <InfoRow title="Total:" value={`$${total}`} backgroundColor="#09C3A420" textColor="#000" />
                            <Pressable style={Gstyles.buypress} onPress={() => {
                                createRecord()
                            }}>
                                <Text style={Gstyles.buybtn}> {'BuyTicket'} </Text>
                            </Pressable>
                        </View>

                    </View>
                    : <View style={{ flex: 6 }} />}

            </View>
        </ImageBackground>

    )
}

export default BuyTickectScreen