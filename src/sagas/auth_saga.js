import { put, call, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { signIn, signUp } from '../endpoints';
import {
    AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_ERROR,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    UNAUTH_USER
} from '../actions/types';
import { 
    handleError, 
    retrieveActionCreator
} from '../helpers/general';
import history from '../helpers/history';

function* fetchSignIn(action) {
    try {
        const { data, status, error } = yield call(signIn, action.payload);
        if (status === "success") {
            yield put(retrieveActionCreator(AUTH_USER_SUCCESS, data));
            localStorage.setItem('token', moment.now().toString());
            history.push('/dashboard');
        } else if (error) {
            handleError(error);
            yield put(retrieveActionCreator(AUTH_USER_ERROR, error.message));
        }
    } catch (error) {
        handleError(error);
        yield put(retrieveActionCreator(AUTH_USER_ERROR, error));
    }
}

function* fetchSignUp(action) {
    try {
        const { data, status, error } = yield call(signUp, action.payload);
        if (status === "success") {
            yield put(retrieveActionCreator(REGISTER_USER_SUCCESS, data));
            localStorage.setItem('token', moment.now().toString());
            history.push('/dashboard');
        } else if (error) {
            handleError(error);
            yield put(retrieveActionCreator(REGISTER_USER_ERROR, error.message));
        }
    } catch (error) {
        handleError(error);
        yield put(retrieveActionCreator(REGISTER_USER_ERROR, error));
    }
}

function* fetchSignOut() {
    localStorage.removeItem('token');
    history.push('/login');
}

export function* signInSaga() {
    yield takeLatest(AUTH_USER, fetchSignIn);
}

export function* signUpSaga() {
    yield takeLatest(REGISTER_USER, fetchSignUp);
}

export function* signOutSaga() {
    yield takeLatest(UNAUTH_USER, fetchSignOut);
}

