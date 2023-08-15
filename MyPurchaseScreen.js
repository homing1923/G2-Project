import { Text, View, FlatList, Alert } from "react-native"
import { store,auth } from "./firestore-config"
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, where, query } from "firebase/firestore"
import { useState, useEffect } from "react"
import { useG_uDocId, useG_authId, useG_lastId } from "./Provider"
import Gstyles from "./Gstyle"
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MyPuchaseScreen = ({ navigation, route }) => {
    const { uDocId } = useG_uDocId()
    const { authId } = useG_authId()
    const { lastId } = useG_lastId()
    const [ticketList, SetTicketList] = useState([])

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (userFromFileAuth) => {
            if(userFromFileAuth){
                retrieveTicketList()
            }
        })
        return () =>{
            listener()
        } 
    }), []

    useEffect(() => {
        retrieveTicketList()
    }, [lastId])

    const retrieveTicketList = async () => {
        const subCollection = collection(store, 'movieDb', uDocId, 'tickets')
        try {
            const filter = where("uAuthId", "==", authId);
            const q = query(subCollection, filter);
            const docSnap = await getDocs(query(q))
            var templist = []
            docSnap.docs.forEach((v) => {
                var tempObj = v.data()
                tempObj.id = v.id
                templist.push(tempObj)
            }
            )
            SetTicketList(templist)
        } catch (err) {
            Alert.alert('Error', `${err}`)
            console.log(`Error@retrieveTicketList: ${err}`)
        }
    }

    const renderListItem = ({ item }) => (
        <View style={{ flexDirection: 'column' }}>
            <Text style={{ textAlign: 'right', borderTopLeftRadius: 25, padding: 10, marginHorizontal: 10, borderWidth: 1, flex: 1, backgroundColor: '#031C44', color: '#fff' }}> {new Date(parseInt(item.timestamp)).toLocaleString()} </Text>

            <View style={{ flexDirection: 'row', padding: 10, marginHorizontal: 10, marginBottom: 10, borderWidth: 1, borderBottomStartRadius: 5, borderBottomEndRadius: 5, backgroundColor: '#' }}>

                <MaterialCommunityIcons style={{ alignSelf: 'center', paddingHorizontal: 20, flex: 1 }} name="ticket-percent" size={48} color="black" />
                {/* <View style={{ alignContent:'center', flexDirection:'row'}}> */}
                <Text style={{ alignSelf: 'center', textAlign: 'center', flex: 1, fontSize: 20 }}> {`x`} </Text>
                <Text style={{ alignSelf: 'center', flex: 2, fontSize: 40 }}> {`${item.NumberOfTicket}`} </Text>
                {/* </View> */}
                <View style={{ flexDirection: 'column', flex: 7, alignContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', flex: 1 }}> {item.movieName} </Text>

                    <Text style={{ alignSelf: 'center', flex: 1 }}> {`$${item.total}`} </Text>

                </View>
            </View>

        </View>

    );

    return (
        <View style={{ flex: 1 }}>
            <Text style={Gstyles.listtitle}>{`Your Ticket${ticketList.length == 1 ? '' : 's'}`}</Text>
            {(ticketList.length === 0) ? <Text style={[Gstyles.inputStyle, {textAlign:'center'}]}>{'Nothing'}</Text> :
                <FlatList
                    data={ticketList.sort((a, b) => {
                        if (a.timestamp > b.timestamp) {
                            return 1;
                        } else if (a.timestamp < b.timestamp) {
                            return -1;
                        } else {
                            return 0;
                        }
                    })
                    }
                    renderItem={renderListItem}
                    keyExtractor={(item) => { return item.timestamp }}
                    style={Gstyles.listContainer}
                />}
        </View>
    )
}

export default MyPuchaseScreen