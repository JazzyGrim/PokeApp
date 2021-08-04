import React from "react";
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get( 'window' ); // Get the window dimensions

const ListItem = ( props ) => {
    return <TouchableOpacity activeOpacity={ 0.6 } style={ styles.container } onPress={ props.onPress }>
        <Image style={ styles.image } source={ { uri: props.imageUrl } }/>
        <View style={ styles.textContainer }>
            <Text style={ styles.title }>{ props.name }</Text>
        </View>
    </TouchableOpacity>
}

const styles = {
    container: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginVertical: 10,
        marginHorizontal: '5%',
        paddingHorizontal: 20,
        borderRadius: 10,

        backgroundColor: '#ffffff',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    textContainer: {
        backgroundColor: "#068CDD",
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden',
        paddingVertical: 5,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: "#ffffff",
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    image: {
        width: width / 4,
        height: width / 4
    }
}

export default ListItem;