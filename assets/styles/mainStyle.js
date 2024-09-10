import { StyleSheet } from "react-native";

const mainStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: "100%",
        backgroundColor: "#272730"
    },
    header: {
        fontSize: 28,
        textAlign: 'center',
        margin: 5,
        fontWeight: '500',
        color: "#fff"
    },
    row: {
        display: 'flex',
        flexDirection: "row"
    },
    column: {
        display: 'flex',
        flexDirection: "column",
        borderRadius: 5,
        borderWidth: 0.8,
        padding: 5,
        width: '13%'
    },
    between: {
        justifyContent: 'space-between'
    },
    around: {
        justifyContent: 'space-around'
    },
    addBtn: {
        position: 'absolute',
        bottom: '3%',
        right: '3%',
        padding: 10,
        backgroundColor: '#00f',
        borderRadius: 14
    },
    goBack: {
        paddingStart: 10,
        margin: 0
    },
})

export default mainStyle;