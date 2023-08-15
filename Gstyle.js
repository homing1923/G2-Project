import { Dimensions, StyleSheet } from "react-native";

const Gstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputStyle: {
        height: 50,
        margin: 8,
        borderColor: '#98ECDE',
        backgroundColor: '#98ECDE50',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },


    //List
    listseparator: {
        height: 1,
        backgroundColor: 'gray',
    },
    listItemContainer: {
        flex: 2,
        flexDirection: "row",
        borderWidth: 3,
        margin: 15,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#98ECDE50',
    },
    listItemContainerLeft: {
        // flex:1,
        width: "90%"
    },
    listItemContainerRight: {
        // flex:1,
        backgroundColor: '#674100',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        // borderRadius:'15',
        width: "10%"
    },
    listItem: {
        flex: 2,
        alignItems: 'center',
        // margin: 5,

        flexDirection: 'row'
    },
    listTextRating: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 15,
    },
    listTextReleaseDate: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: "bold",
    },
    leftContainer: {
        width: '20%',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        flex: 1,
    },
    rightContainer: {
        // borderWidth: 1,

        backgroundColor: '#FFDEA4',
        opacity: 0.7,
        width: '60%',
        marginLeft: 10,
        borderRadius: 5,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
    listbg: {
        width: 'auto',
        height: 'auto',
        padding: 10,
        borderRadius: 2,
    },
    listimg: {
        width: 'auto',
        height: '100%',
        padding: 10,
        borderRadius: 15,
    },
    listtitle: {
        fontSize: 20,
        padding: 10,
        borderRadius: 15,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#674100',
    },
    listaboutStyle: {
        padding: 10,
        textAlign: 'left',
        fontWeight: '200',
    },

    //Detail Page
    detailimg: {
        resizeMode: 'cover',
        width: '100%',
        height: '30%',
        borderWidth: 20,
        // margin:5,
        // marginHorizontal: 90, 
    },
    detailbg: {
        width: 'auto',
        height: Dimensions.get('window').height,
    },
    detailmaincontainer: {
        flex: 1,
        flexDirection: 'column',
        height: '25%',

    },
    detaildesccontainer: {
        flex: 1,
        height: '40%',
        padding: 10,
    },

    //Login Page
    loginbg: {
        width: 'auto',
        height: Dimensions.get('window').height,
        flex: 1,
        alignItems: 'center',
    },
    logincontainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    },
    signupcontainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    },



    //BuyTicket Page
    buyinputStyle: {
        height: 50,
        margin: 8,
        borderColor: '#98ECDE',
        backgroundColor: '#98ECDE90',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    buybg: {
        width: 'auto',
        height: Dimensions.get('window').height,
        flex: 1,
    },
    buypress: {
        width: Dimensions.get('window').width * 0.85,
        marginTop: 10,
        paddingVertical: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#AF470070',
        borderRadius: 10,
    },
    buybtn: {
        textAlign: 'center',
    },
    buymaincontainer: {
        flexDirection: 'column',
        flex: 1
    },

    buytitlesection: {
        padding: 10,
        flex: 1
    },
    buytitle: {
        textAlign: 'center'
    },
    buytitletext: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    buytextinput : { borderWidth: 2, width: Dimensions.get('screen').width * 0.9, padding: 15, borderRadius: 8 },
    buyinputcontainer : { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 20, flex: 1 },
    


    //TO But Page
    tobuybtn: {
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 5,
        paddingVertical: 10,
        marginBottom: 5,
        width: Dimensions.get('window').width * 0.9,
        backgroundColor: '#FFC9A4',
    },

    //Btns
    loginedbuybtn: {
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 20,
        paddingVertical: 20,
        marginBottom: 5,
        width: Dimensions.get('window').width * 0.9,
        backgroundColor: '#FDA2AD',
    },
    loginorsignupbtn: {
        textAlign: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        marginBottom: 5,
        width: Dimensions.get('window').width * 0.9,
        marginHorizontal: 10,
        backgroundColor: '#FDA2AD',
        borderRadius: 5,
    },
    loginbtn: {
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 20,
        paddingVertical: 20,
        marginBottom: 5,
        width: Dimensions.get('window').width * 0.9,
        marginHorizontal: 10,
        backgroundColor: '#A0BEED',
        borderRadius: 5,
    },
    signupbtn: {
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 20,
        paddingVertical: 20,
        marginBottom: 5,
        width: Dimensions.get('window').width * 0.9,
        marginHorizontal: 10,
        backgroundColor: '#FDA2AD',
        borderRadius: 5,
    },
    buttonTextStyle: {
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#fff',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
});
export default Gstyles