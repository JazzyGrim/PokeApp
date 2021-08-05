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

    const [ RawData, SetRawData ] = useState( [] );
    const [ DataURL, SetDataURL ] = useState( DEFAULT_API );

    const [ RenderedData, SetRenderedData ] = useState( [ ] );
    const [ Page, SetPage ] = useState( 1 );

    const [ PokemonName, SetPokemonName ] = useState( "" );
    const [ PrevPokemonType, SetPrevPokemonType ] = useState( -1 );
    const [ PokemonType, SetPokemonType ] = useState( -1 );
    
    const [ Loading, SetLoading ] = useState( true );
    const [ ModalVisible, SetModalVisible ] = useState( false );

    // Load the data initially, and when resetting to "Any" type
    // This loads the Pokemon data as a list
    useEffect( ( ) => {
        if ( DataURL == DEFAULT_API && PokemonType == -1 ) loadNextPage( );
    }, [ DataURL, PokemonType ] );

    useEffect( ( ) => {
        // When we are trying to search for a pokemon
        // Reset the raw data
        SetRawData( [ ] );
        SetRenderedData( [ ] );

        // If we have cleared the search field, reset the data URL to the default API
        // This will load the data again, but only if the pokemon type is set to -1
        if ( PokemonName == "" ) {
            SetDataURL( DEFAULT_API );
            if ( PokemonType != -1 ) loadPokemonByType( ); // If we have selected a type, reload the Pokemon by type
        } else { // If we are searching for a pokemon by name or ID

            const SearchURL = "https://pokeapi.co/api/v2/pokemon/" + PokemonName.toLowerCase();
            
            SetLoading( true );
            axios.get( SearchURL ).then( response => {
                SetRawData( [ response.data ] ); // Set the data to the result
            } ).catch( error => {
                if ( error.response ) console.log( "Encountered error code: " + error.response.status );
            } ).finally( _ => SetLoading( false ) );

        }
    }, [ PokemonName ] );

    useEffect( ( ) => {
        if ( ModalVisible ) return; // Do NOT update if the modal is still visible
        if ( PokemonName != "" ) return; // Do NOT update if we are currently searcing, the update will happen
                                        // when the user cleares the search

        // When we close the modal, check if the pokemon type has changed
        if ( PrevPokemonType == PokemonType ) return; // If the pokemon type hasn't changed, skip the function
        SetPrevPokemonType( PokemonType ); // If the type has changed, update the prev type to the current
        
        SetRawData( [ ] ); // Clear the Pokemon data
        SetRenderedData( [ ] ); // Clear the Pokemon data
        SetPage( 1 ); // Reset the page

        // If we're resetting the type to "Any"
        if ( PokemonType == -1 ) {
            SetDataURL( DEFAULT_API ); // Reset the API to default
            return; // Don't run the rest for "Any" pokemon type
        }

        // Load the pokemon by type
        loadPokemonByType( );

    }, [ ModalVisible, PokemonType ] );

    const loadPokemonByType = ( ) => {

        SetLoading( true );

        const TypeURL = "https://pokeapi.co/api/v2/type/" + PokemonType;
        
        axios.get( TypeURL ).then( response => {
            
            // If there are no pokemon in this category
            if ( !response.data.pokemon.length ) return;

            let pokemonList = [ ];

            // For each pokemon of this type
            for (let i = 0; i < response.data.pokemon.length; i++) {
                const element = response.data.pokemon[i].pokemon;

                pokemonList.push( {
                    name: element.name,
                    url: element.url
                } );

            }

            SetRawData( pokemonList ); // Append new data to the list

            // Load all the data for the first 5 pokemon
            pokemonList.slice( 0, 5 ).forEach( p => {
                // Grabs the details for the pokemon
                axios.get( p.url ).then( ( { data: pokemonData } ) => {
                    SetRenderedData( oldData => [ ...oldData, pokemonData ] ); // Append new data to the list
                } ).catch( error => {
                    console.log( error );
                } );
            } );


        } ).catch( error => {
            console.log( error );
        } ).finally( ( ) => {
            SetLoading( false );
        } );

    }

    const renderItem = ( { item } ) => (
        <ListItem onPress={ ( ) => navigation.push( "Pokemon", { pokemon: item } ) } name={ item.name } imageUrl={ item.sprites ? item.sprites.front_default : "" } />
        //<ListItem onPress={ ( ) => {} } name={ "Test" } imageUrl={ "" } />
    );
    
    const loadNextPage = ( ) => {

        if ( PokemonType != -1 ) {

            if ( RawData.length < ( Page * 5 ) ) return; // If we have reached the end of the list, don't continue

            let newData = RawData.slice( Page * 5, Page * 5 + 5 );

            // Load all the data for the new pokemon
            newData.forEach( p => {
                // Grabs the details for the pokemon
                axios.get( p.url ).then( ( { data: pokemonData } ) => {
                    SetRenderedData( oldData => [ ...oldData, pokemonData ] ); // Append new data to the list
                } ).catch( error => {
                    console.log( error );
                } );
            } );

            SetPage( prevPage => prevPage + 1 ); // Increase the page count
            return;
        }

        if ( PokemonName != "" ) return; // When filtering by type, or searching by name/ID, no need for infinite scrolling
        
        SetLoading( true );

        // Load the next page of Pokemon
        axios.get( DataURL ).then( response => {
            
            // For each pokemon
            for (let i = 0; i < response.data.results.length; i++) {
                const element = response.data.results[i];
                
                // Load all the data for each pokemon
                axios.get( element.url ).then( ( { data: pokemonData } ) => {
                    SetRawData( oldData => [ ...oldData, pokemonData ] ); // Append new data to the list
                } ).catch( error => {
                    console.log( error );
                } ).finally( ( ) => {
                    if ( i == ( response.data.results.length - 1 ) ) SetLoading( false );
                } );
            }

            // Set the data URL to the next page
            SetDataURL( response.data.next );
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
            data={ ( ( PrevPokemonType == -1 || PokemonType == -1 ) || PokemonName != "" ) ? RawData : RenderedData } // For "Any" type, the server automatically paginates the results
                                                                // However, it does not do so when filtering pokemon by type
                                                                // Hence, we need to do it manually, for performance reasons
            initialNumToRender={ 5 }
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
                                onValueChange={ ( itemValue, itemIndex ) =>
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
        textAlign: 'center',        
        color: '#eb4034',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30
    },
}

export default Home;