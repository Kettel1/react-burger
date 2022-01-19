import {
    DELETE_AUTH, LOADING_USER, LOADING_USER_COMPLETED,
    LOGIN_FAILED, LOGIN_OR_PASSWORD_INCORRECT,
    LOGIN_SUCCESS, REGISTER_USER_CLEAR_TEXT_ERROR,
    REGISTER_USER_FAILED, REGISTER_USER_SET_TEXT_ERROR,
    REGISTER_USER_SUCCESS, RESET_PASSWORD_COMPLETED,
    RESET_PASSWORD_SUCCESS, SET_USER_INFO
} from "../actions/auth";
import {IUserTypes} from "../../types/ingredientTypes";

interface IAuthState {
    isLoading: boolean,
    errorMessage: string | undefined,
    isAuth: boolean,
    user: IUserTypes,
    success: boolean
}

interface IAuthAction {
    type: string,
    payload?: any,
    message?: string
}

const initialState: IAuthState = {
    isLoading: true,
    errorMessage: '',
    isAuth: false,
    user: {
        email: "",
        name: ""
    },
    success: false
}

export const authReducer = (state = initialState, action: IAuthAction):IAuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, isAuth: true, user: {...action.payload.user}}
        case LOGIN_FAILED:
            return {...initialState, success: false, isLoading: false}
        case LOGIN_OR_PASSWORD_INCORRECT:
            return {...initialState, success: false, isLoading: false, errorMessage: action.message}
        case REGISTER_USER_FAILED:
            return {...initialState, success: false, isLoading: false}
        case REGISTER_USER_SUCCESS:
            return {...state, ...action.payload}
        case REGISTER_USER_SET_TEXT_ERROR:
            return {...state, errorMessage: action.message}
        case REGISTER_USER_CLEAR_TEXT_ERROR:
            return {...state, errorMessage: ''}
        case RESET_PASSWORD_SUCCESS:
            return {...state, success: true}
        case RESET_PASSWORD_COMPLETED:
            return {...state, success: false}
        case SET_USER_INFO:
            return {...state, user: {...action.payload}, isAuth: true, isLoading: false}
        case DELETE_AUTH:
            return {...initialState, isLoading: false}
        case LOADING_USER:
            return {...state, isLoading: true}
        case LOADING_USER_COMPLETED:
            return {...state, isLoading: false}
        default:
            return state
    }
}
