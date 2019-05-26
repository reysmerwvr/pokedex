import { all } from 'redux-saga/effects';
import { signInSaga, signUpSaga, signOutSaga } from './auth_saga';

export default function* rootSaga() {
  yield all([
    signInSaga(),
    signUpSaga(),
    signOutSaga(),
  ]);
}