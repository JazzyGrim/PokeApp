import React, { useState, useEffect } from "react";
import { FlatList, View, SafeAreaView, Text, Dimensions, ActivityIndicator } from "react-native";
import Modal from 'react-native-modal';
import axios from 'axios';
import ListItem from "./ListItem";
import Header from "./Header";
import { Picker } from "@react-native-picker/picker";

const DEFAULT_API = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=5";

const { width, height } = Dimensions.get( 'window' ); // Get the window dimensions

const Home = ( { navigation } ) => {

    const [ PokeData, SetPokeData ] = useState( [] );
    const [ Loading, SetLoading ] = useState( true );
    const [ NextDataURL, SetNextDataURL ] = useState( DEFAULT_API );
    const [ ModalVisible, SetModalVisible ] = useState( false );
    const [ PokemonName, SetPokemonName ] = useState( "" );
    const [ PrevPokemonType, SetPrevPokemonType ] = useState( -1 );
    const [ PokemonType, SetPokemonType ] = useState( -1 );

    useEffect( ( ) => {
        if ( NextDataURL == DEFAULT_API ) loadNextPage( ); // Load the data initially, and when resetting to "Any" type
    }, [ NextDataURL ] );

    useEffect( ( ) => {
        SetPokeData( [] );
        if ( PokemonName == "" ) SetNextDataURL( DEFAULT_API );
        else {
            SetLoading( true );
            axios.get( "https://pokeapi.co/api/v2/pokemon/" + PokemonName.toLowerCase() )
            .then( response => {
                SetPokeData( [ response.data ] ); // Set the data to the result
            } ).catch( error => {
                console.log( error );
            } ).finally( _ => SetLoading( false ) );
        }
    }, [ PokemonName ] );

    useEffect( ( ) => {
        if ( PrevPokemonType == PokemonType ) return; // If the pokemon type hasn't changed
        SetPrevPokemonType( PokemonType );
        
        SetPokeData( [] ); // Clear the Pokemon data
        if ( PokemonType == -1 ) {
            console.log( "Resetting" );
            SetNextDataURL( DEFAULT_API ); // Reset the API to default
            return; // Don't run the rest for "Any" pokemon type
        }

        SetLoading( true );
        console.log("Type: ", "https://pokeapi.co/api/v2/type/" + PokemonType);
        axios.get( "https://pokeapi.co/api/v2/type/" + PokemonType )
        .then( response => {

            if ( !response.data.pokemon.length ) { // If there are no pokemon in this category
                SetLoading( false );
                return;
            }

            for (let i = 0; i < response.data.pokemon.length; i++) {
                const element = response.data.pokemon[i];
                    
                axios.get( element.pokemon.url )
                .then( ( { data: pokemonData } ) => {
                    SetPokeData( oldData => [ ...oldData, pokemonData ] ); // Append new data to the list
                } ).catch( error => {
                    console.log( error );
                } ).finally( ( ) => {
                    if ( i == ( response.data.pokemon.length - 1 ) ) SetLoading( false );
                } );
            }

        } ).catch( error => {
            console.log( error );
        } );

    }, [ ModalVisible ] );

    const renderItem = ( { item } ) => (
        <ListItem onPress={ ( ) => navigation.push( "Pokemon", { pokemon: item } ) } name={ item.name } imageUrl={ item.sprites.front_default } />
    );
    
    const loadNextPage = ( ) => {
        if ( PokemonType != -1 ) return; // When filtering by type, no need for infinite scrolling

        SetLoading( true );
        axios.get( NextDataURL )
        .then( response => {
            
            for (let i = 0; i < response.data.results.length; i++) {
                const element = response.data.results[i];
                    
                axios.get( element.url )
                .then( ( { data: pokemonData } ) => {
                    SetPokeData( oldData => [ ...oldData, pokemonData ] ); // Append new data to the list
                } ).catch( error => {
                    console.log( error );
                } ).finally( ( ) => {
                    if ( i == ( response.data.results.length - 1 ) ) SetLoading( false );
                } );
            }

            SetNextDataURL( response.data.next );
        } ).catch( error => {
            console.log( error );
        } );
    }

    const closeModal = ( ) => SetModalVisible( false );

    return (
        <SafeAreaView>
        <Header value={ PokemonName } setValue={ SetPokemonName } onFilterPress={ ( ) => SetModalVisible( true ) } />
        <FlatList
            contentContainerStyle={ styles.container }
            data={ PokeData }
            renderItem={ renderItem }
            keyExtractor={ item => item.name }
            onEndReached={ !Loading && loadNextPage }
            removeClippedSubviews={true}
            ListEmptyComponent={ Loading ? <ActivityIndicator style={ styles.loaderStyle } size="large" color="#0B323C"/> : <Text style={ styles.emptyText }>No results found!</Text> }
        />
        <Modal
                    isVisible={ ModalVisible }
                    onBackButtonPress={ closeModal }
                    onBackdropPress={ closeModal }
                    style={ styles.modal }
                    backdropOpacity={ 0.3 }
                    useNativeDriver={ true } // Causes a flickering issue on iOS, lines below fix it
                    backdropTransitionOutTiming={0}
                    hideModalContentWhileAnimating={ true }
                >
                    <View style={ styles.modalContainer }>
                        <View style={ styles.fullRow }>
                            <Text style={ styles.optionText }>Vrsta pokemona</Text>
                            <Picker
                                style={ styles.picker }
                                selectedValue={PokemonType}
                                onValueChange={(itemValue, itemIndex) =>
                                    SetPokemonType(itemValue)
                                }>
                                <Picker.Item label="Any" value={-1} />
                                <Picker.Item label="Normal" value={1} />
                                <Picker.Item label="Fighting" value={2} />
                                <Picker.Item label="Flying" value={3} />
                                <Picker.Item label="Poison" value={4} />
                                <Picker.Item label="Ground" value={5} />
                                <Picker.Item label="Rock" value={6} />
                                <Picker.Item label="Bug" value={7} />
                                <Picker.Item label="Ghost" value={8} />
                                <Picker.Item label="Steel" value={9} />
                                <Picker.Item label="Fire" value={10} />
                                <Picker.Item label="Water" value={11} />
                                <Picker.Item label="Grass" value={12} />
                                <Picker.Item label="Electric" value={13} />
                                <Picker.Item label="Psychic" value={14} />
                                <Picker.Item label="Ice" value={15} />
                                <Picker.Item label="Dragon" value={16} />
                                <Picker.Item label="Dark" value={17} />
                                <Picker.Item label="Fairy" value={18} />
                                <Picker.Item label="Unknown" value={10001} />
                                <Picker.Item label="Shadow" value={10002} />
                            </Picker>
                        </View>
                    </View>
                </Modal>
        </SafeAreaView>
    )
}

const styles = {
    container: {
        flexGrow: 1
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer: {
        width: width,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 50,
        backgroundColor: '#ffffff',

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    fullRow: {
        width: width - 40,
        marginVertical: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    optionText: {
        color: '#0B323C',
        fontSize: 18,
        paddingVertical: 6
    },
    picker: {
        width: '50%',
        height: '100%'
    },
    loaderStyle: {
        marginVertical: 50
    },
    emptyText: {
        width: '100%',
        textAlign: 'center',        
        color: '#eb4034',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30
    },
}

export default Home;