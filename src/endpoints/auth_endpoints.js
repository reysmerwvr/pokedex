import validator from 'validator';
import users from '../data/users.json';

export const signIn = (payload) => {
    const { email, password } = payload;
    const user = users.find((user) => {
        return (user.email === email && user.password === password);
    });
    if(user) {
        delete user.password;
        return {
            data: user,
            status: "success",
            message: "OK",
            code: 200,
            error: {}
        };
    } else {
        return {
            data: {},
            status: "error",
            message: "Invalid credentials.",
            code: 401,
            error: {
                message: "Invalid credentials."
            }
        }
    }
}

export const signUp = (payload) => {
    const { name, email, password, confirmPassword } = payload;
    if(!validator.isEmpty(name) && !validator.isEmpty(email) && password === confirmPassword) {
        const user = { name, email }; 
        return {
            data: user,
            status: "success",
            message: "OK",
            code: 200,
            error: {}
        };
    } else {
        return {
            data: {},
            status: "error",
            message: "Error creating poke master.",
            code: 400,
            error: {
                message: "Error creating poke master."
            }
        }
    }
}