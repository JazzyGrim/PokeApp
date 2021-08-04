import React, { useEffect } from "react";
import { ScrollView, Text, Image, View } from "react-native";

const Pokemon = ( { route } ) => {
    return <ScrollView contentContainerStyle={ styles.container }>
                <Image style={ styles.image } source={ { uri: route.params.pokemon.sprites.front_default } } />
                <Text style={ styles.name }>{ route.params.pokemon.name }</Text>
                
                { route.params.pokemon.stats.map( ( stat ) => <Text key={ stat.stat.name } style={ styles.stat }>{ stat.stat.name + ": " + stat.base_stat }</Text> ) }

                <View style={ { ...styles.paramsContainer, backgroundColor: '#fc032d' } }>
                    <Text style={ styles.paramsTitle }>Abilities</Text>
                    { route.params.pokemon.abilities.map( ( { ability } ) => <Text key={ ability.name } style={ styles.paramsText }>{ ability.name }</Text> ) }
                </View>

                <View style={ styles.paramsContainer }>
                    <Text style={ styles.paramsTitle }>Moves</Text>
                    { route.params.pokemon.moves.map( ( { move } ) => <Text key={ move.name } style={ styles.paramsText }>{ move.name }</Text> ) }
                </View>
            </ScrollView>
}

const styles = {

    container: {
        width: '100%',

        paddingVertical: 10,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    },
    image: {
        width: 200,
        height: 200
    },
    name: {
        fontSize: 32,
        color: "#ffffff",
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#000000'
    },
    stat: {
        fontSize: 16,
        color: "#ffffff",
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#0B323C'
    },
    paramsContainer: {
        width: "85%",

        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,

        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        backgroundColor: '#068CDD',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    paramsTitle: {
        width: '100%',

        fontSize: 24,
        color: "#ffffff",
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#ffffff',
        marginVertical: 5
    },
    paramsText: {
        width: '50%',

        fontSize: 18,
        color: "#ffffff",
        textTransform: 'capitalize',
        color: '#ffffff'
    }

}

export default Pokemon;