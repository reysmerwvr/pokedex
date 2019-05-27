import {
    SET_LOADING,
    SET_ERROR,
    GET_POKEMONS_SUCCESS,
    SET_FILTERED_POKEMONS,
    SET_POKEMON
} from '../actions/types';

const INITIAL_STATE = {
    paginator: {},
    pokemonsList: [],
    pokemonsFilteredList: [],
    selectedPokemon: {},
    error: null,
    loading: false,
};

const pokemonsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: true, error: null };
        case SET_ERROR:
            return { ...state, loading: false, error: action.payload };
        case GET_POKEMONS_SUCCESS:
            const { count, next, previous, results } =  action.payload;
            return { 
                ...state,
                pokemonsList: [...state.pokemonsList, ...results],
                paginator: { count, next, previous }
            };
        case SET_FILTERED_POKEMONS:
            return { 
                ...state,
                pokemonsFilteredList: action.payload
            };
        case SET_POKEMON:
            return { 
                ...state,
                selectedPokemon: action.payload
            };
        default:
            return state;
    }
};

export default pokemonsReducer;
