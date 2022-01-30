import {
    DELETE_AUTH, LOADING_USER, LOADING_USER_COMPLETED,
    LOGIN_FAILED, LOGIN_OR_PASSWORD_INCORRECT,
    LOGIN_SUCCESS, REGISTER_USER_CLEAR_TEXT_ERROR,
    REGISTER_USER_FAILED, REGISTER_USER_SET_TEXT_ERROR,
    REGISTER_USER_SUCCESS, RESET_PASSWORD_COMPLETED,
    RESET_PASSWORD_SUCCESS, SET_USER_INFO
} from "../actions/auth";

import {IUserTypes} from "../../types/ingredientTypes";

import {
    IAuthActions,
    IAuthState,
    IDeleteAuth,
    ILoadingUser,
    ILoadingUserComplete,
    ILoginFailed,
    ILoginOrPasswordIncorrect,
    ILoginSuccess,
    IRegisterUserClearTextError,
    IRegisterUserFailed,
    IRegisterUserSetTextError,
    IRegisterUserSuccess,
    IResetPasswordComplete,
    IResetPasswordSuccess,
    ISetUserInfo
} from "../../types/authTypes";

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

export const authReducer = (state = initialState, action: IAuthActions): IAuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, isAuth: true, user: {...action.user}}
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

export const loginSuccess = (user: IUserTypes): ILoginSuccess => ({
    type: LOGIN_SUCCESS,
    user: user
})

export const loginFailed = (): ILoginFailed=> ({
    type: LOGIN_FAILED
});

export const loginOrPasswordIncorrect = (message: string): ILoginOrPasswordIncorrect => ({
    type: LOGIN_OR_PASSWORD_INCORRECT,
    message: message
})

export const registerUserFailed = (): IRegisterUserFailed => ({
    type: REGISTER_USER_FAILED
})

export const registerUserSuccess = (user: IUserTypes): IRegisterUserSuccess => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
})

export const registerUserSetTextError = (message: string): IRegisterUserSetTextError => ({
    type: REGISTER_USER_SET_TEXT_ERROR,
    message: message,
})

export const registerUserClearTextError = (): IRegisterUserClearTextError => ({
    type: REGISTER_USER_CLEAR_TEXT_ERROR
})

export const resetPasswordSuccess = (): IResetPasswordSuccess => ({
    type: RESET_PASSWORD_SUCCESS
})

export const resetPasswordComplete = (): IResetPasswordComplete=> ({
    type: RESET_PASSWORD_COMPLETED
})

export const setUserInfo = (userInfo: IUserTypes): ISetUserInfo => ({
    type: SET_USER_INFO,
    payload: userInfo
})

export const deleteAuth = (): IDeleteAuth => ({
    type: DELETE_AUTH
})

export const loadingUser = (): ILoadingUser => ({
    type: LOADING_USER
})

export const loadingUserComplete = (): ILoadingUserComplete => ({
    type: LOADING_USER_COMPLETED
})
