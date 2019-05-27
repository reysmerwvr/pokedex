import { all } from 'redux-saga/effects';
import { signInSaga, signUpSaga, signOutSaga } from './auth_saga';
import { getPokemonsSaga } from './pokemons_saga';

export default function* rootSaga() {
  yield all([
    signInSaga(),
    signUpSaga(),
    signOutSaga(),
    getPokemonsSaga()
  ]);
}