import { IUserTypes } from './ingredientTypes';
import {
    DELETE_AUTH,
    LOADING_USER,
    LOADING_USER_COMPLETED,
    LOGIN_FAILED,
    LOGIN_OR_PASSWORD_INCORRECT,
    LOGIN_SUCCESS,
    REGISTER_USER_CLEAR_TEXT_ERROR,
    REGISTER_USER_FAILED,
    REGISTER_USER_SET_TEXT_ERROR,
    REGISTER_USER_SUCCESS,
    RESET_PASSWORD_COMPLETED,
    RESET_PASSWORD_SUCCESS,
    SET_USER_INFO,
} from '../services/actions/auth';

export interface IAuthState {
    isLoading: boolean;
    errorMessage: string | undefined;
    isAuth: boolean;
    user: IUserTypes;
    success: boolean;
}

export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: IUserTypes;
}

export interface ILoginFailed {
    readonly type: typeof LOGIN_FAILED;
}

export interface ILoginOrPasswordIncorrect {
    readonly type: typeof LOGIN_OR_PASSWORD_INCORRECT;
    readonly message: string;
}

export interface IRegisterUserFailed {
    readonly type: typeof REGISTER_USER_FAILED;
}

export interface IRegisterUserSuccess {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly payload: IUserTypes;
}

export interface IRegisterUserSetTextError {
    readonly type: typeof REGISTER_USER_SET_TEXT_ERROR;
    readonly message: string;
}

export interface IRegisterUserClearTextError {
    readonly type: typeof REGISTER_USER_CLEAR_TEXT_ERROR;
}

export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordComplete {
    readonly type: typeof RESET_PASSWORD_COMPLETED;
}

export interface ISetUserInfo {
    readonly type: typeof SET_USER_INFO;
    readonly payload: IUserTypes;
}

export interface ILoadingUser {
    readonly type: typeof LOADING_USER;
}

export interface ILoadingUserComplete {
    readonly type: typeof LOADING_USER_COMPLETED;
}

export interface IDeleteAuth {
    readonly type: typeof DELETE_AUTH;
}

export type TAuthActions =
    | ILoginSuccess
    | ILoginFailed
    | ILoginOrPasswordIncorrect
    | IRegisterUserFailed
    | IRegisterUserSuccess
    | IRegisterUserSetTextError
    | IRegisterUserClearTextError
    | IResetPasswordSuccess
    | IResetPasswordComplete
    | ISetUserInfo
    | ILoadingUser
    | ILoadingUserComplete
    | IDeleteAuth;
