import { put, call, takeLatest } from 'redux-saga/effects';
import { getPokemons, getPokemon } from '../endpoints';
import {
    SET_LOADING,
    SET_ERROR,
    GET_POKEMONS_SUCCESS
} from '../actions/types';
import { 
    handleError, 
    retrieveActionCreator
} from '../helpers/general';

function* fetchPokemons(action) {
    try {
       const { data } = yield call(getPokemons, action.payload);
       let { results } =  data;
       if (results.length > 0) {
            for(let index in results) {
                const { name } = results[index];
                    if(name) {
                        const getPokemonResponse = yield call(getPokemon, { name });
                        results[index] = { ...results[index], ...getPokemonResponse.data };
                    }
            }
            data.results = results;
            yield put(retrieveActionCreator(GET_POKEMONS_SUCCESS, data));
       } else {
            const error = { message: 'Data not found' }; 
            handleError(error);
            yield put(retrieveActionCreator(SET_ERROR, error));
       }
    } catch (error) {
       handleError(error);
       yield put(retrieveActionCreator(SET_ERROR, error));
    }
}

export function* getPokemonsSaga() {
    yield takeLatest(SET_LOADING, fetchPokemons);
}


