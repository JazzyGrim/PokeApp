import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome5';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const IconButton = ( { onPress, disabled, icon, text, solid } ) => {
    
    return (
        <TouchableOpacity disabled={ disabled } onPress={ onPress } style={ disabled ? { ...styles.button, opacity: 0.7 } : styles.button }>
            <Icon style={ styles.icon } name={ icon } size={ 16 } color={ '#ffffff' } solid={ solid } />
            <Text style={ styles.text }>{ text }</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create( {
    button: {
        height: '100%',
        backgroundColor: '#068CDD',
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        paddingHorizontal: 10,

    },
    icon: {
        marginRight: 5
    },
    text: {
        color: '#ffffff',
        fontSize: 14
    }
} );

export default IconButton;