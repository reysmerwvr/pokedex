import axios from 'axios';

const envVars = {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'https://pokeapi.co/api/v2'
};

export const getPokemons = (payload) => {
    let limit = 50;
    let offset = 0;
    if(payload) {
        limit = payload.limit;
        offset = payload.offset;
    }
    return axios.get(`${envVars.REACT_APP_API_URL}/pokemon/`, {
        params: {
            limit,
            offset
        }
    });
}

export const getPokemon = (payload) => {
    return axios.get(`${envVars.REACT_APP_API_URL}/pokemon/${payload.name}`);
}