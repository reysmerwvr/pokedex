import {
    SET_LOADING,
    SET_FILTERED_POKEMONS,
    SET_POKEMON
} from './types';

export const getPokemons = (payload) => ({
    type: SET_LOADING,
    payload
});

export const setFilteredPokemons = (payload) => ({
    type: SET_FILTERED_POKEMONS,
    payload
});

export const selectPokemon = (payload) => ({
    type: SET_POKEMON,
    payload
});

