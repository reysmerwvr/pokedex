import {
    AUTH_USER,
    REGISTER_USER,
    UNAUTH_USER
} from './types';

export const signIn = (payload) => ({
    type: AUTH_USER,
    payload
});

export const signUp = (payload) => ({
    type: REGISTER_USER,
    payload
});

export const signOut = () => ({
    type: UNAUTH_USER
});

