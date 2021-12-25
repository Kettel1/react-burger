import {
    DELETE_AUTH, LOADING_USER, LOADING_USER_COMPLETED,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    REGISTER_USER_FAILED,
    REGISTER_USER_SUCCESS, RESET_PASSWORD_COMPLETED,
    RESET_PASSWORD_SUCCESS, SET_USER_INFO
} from "../actions/auth";

const initialState = {
    isLoading: false,
    errorMessage: '',
    isAuth: false,
    user: {
        email: "",
        name: ""
    },
    success: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, isAuth: true, user: {...action.payload.user}}
        case LOGIN_FAILED:
            return {...initialState, success: false}
        case REGISTER_USER_FAILED:
            return {...initialState, success: false}
        case REGISTER_USER_SUCCESS:
            return {...state, ...action.payload}
        case RESET_PASSWORD_SUCCESS:
            return {...state, success: true}
        case RESET_PASSWORD_COMPLETED:
            return {...state, success: false}
        case SET_USER_INFO:
            return {...state, user: {...action.payload}, isAuth: true, isLoading: false}
        case DELETE_AUTH:
            return {...initialState}
        case LOADING_USER:
            return {...state, isLoading: true}
        case LOADING_USER_COMPLETED:
            return {...state, isLoading: false}
        default:
            return state
    }
}
