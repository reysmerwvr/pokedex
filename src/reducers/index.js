import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import pokemonsReducer from './pokemons_reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    pokemons: pokemonsReducer
});

export default rootReducer;