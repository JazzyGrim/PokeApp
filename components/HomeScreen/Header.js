import IonIcon from '@expo/vector-icons/Ionicons';
import React from "react";
import { View, TextInput } from "react-native";
import IconButton from './IconButton';

const Header = ( props ) => {

    return <View style={ styles.container }>
        <View style={ styles.inputContainer }>
            <IonIcon style={ styles.inputIcon } name="md-pin" size={ 20 } color={ '#0B323C' } />
            <TextInput style={ styles.input } placeholder="Ime ili broj pokemona" value={ props.value } onChangeText={ ( value ) => props.setValue( value ) } />
        </View>
        <IconButton icon="sliders-h" disabled={ false } text="Filteri" onPress={ props.onFilterPress } />
    </View>
}

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingVertical: 10,
        paddingHorizontal: '5%',

        backgroundColor: '#ffffff',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,

        zIndex: 10
    },
    inputContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#E4E4E4',
        borderRadius: 5,

        width: '75%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    inputIcon: {
        marginRight: 10
    },
    input: {
        flex: 1,
        color: '#0B323C',
        fontSize: 12
    },
}

export default Header;