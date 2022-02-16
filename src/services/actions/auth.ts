import { deleteCookie, setCookie } from '../helpers';

import {
    fetchRegisterRequest,
    fetchLoginUserRequest,
    fetchResetPasswordRequest,
    checkAuthUser,
    fetchLogOut,
    fetchForgotPasswordRequest,
    fetchUpdateUser,
} from '../api';

import {
    IForgotPasswordUserTypes,
    ILoginUserTypes,
    IRegisterUserTypes,
    IResetPasswordTypes,
    IUpdateUserTypes,
    IUserTypes,
} from '../../types/ingredientTypes';

import { AppDispatch, AppThunk } from '../../types';
import {
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
    ISetUserInfo,
} from '../../types/authTypes';

export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_SET_TEXT_ERROR: 'REGISTER_USER_SET_TEXT_ERROR' = 'REGISTER_USER_SET_TEXT_ERROR';
export const REGISTER_USER_CLEAR_TEXT_ERROR: 'REGISTER_USER_CLEAR_TEXT_ERROR' = 'REGISTER_USER_CLEAR_TEXT_ERROR';

export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_OR_PASSWORD_INCORRECT: 'LOGIN_OR_PASSWORD_INCORRECT' = 'LOGIN_OR_PASSWORD_INCORRECT';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_COMPLETED: 'RESET_PASSWORD_COMPLETED' = 'RESET_PASSWORD_COMPLETED';

export const SET_USER_INFO: 'SET_USER_INFO' = 'SET_USER_INFO';

export const DELETE_AUTH: 'DELETE_AUTH' = 'DELETE_AUTH';

export const LOADING_USER: 'LOADING_USER' = 'LOADING_USER';
export const LOADING_USER_COMPLETED: 'LOADING_USER_COMPLETED' = 'LOADING_USER_COMPLETED';

export const loginUserRequest: AppThunk = (form: ILoginUserTypes, callback: () => void) => (dispatch: AppDispatch) => {
    return fetchLoginUserRequest(form)
        .then((userInfo) => {
            setCookie('accessToken', userInfo.accessToken);
            localStorage.setItem('refreshToken', userInfo.refreshToken);
            dispatch(loginSuccess(userInfo.user));
            callback();
        })
        .catch((e) => {
            dispatch(loginFailed());
            dispatch(loginOrPasswordIncorrect('Почта или пароль введены неверно'));
        });
};

export const registerRequest: AppThunk = (form: IRegisterUserTypes) => (dispatch: AppDispatch) => {
        return fetchRegisterRequest(form)
            .then((response) => {
                if (!response.ok) {
                    dispatch(registerUserFailed());
                    return response.json();
                } else {
                    return response.json();
                }
            })
            .then((userInfo) => {
                if (userInfo.success) {
                    dispatch(registerUserClearTextError());
                    setCookie('accessToken', userInfo.accessToken);
                    localStorage.setItem('refreshToken', userInfo.refreshToken);
                    dispatch(registerUserSuccess(userInfo.user));
                } else {
                    if (userInfo.message === 'User already exists') {
                        dispatch(registerUserSetTextError('Пользователь с такой почтой уже зарегистрирован'));
                    }
                }
            });
    };

export const forgotPassword: AppThunk = (form: IForgotPasswordUserTypes) => (dispatch: AppDispatch) => {
    return fetchForgotPasswordRequest(form)
        .then((response) => {
            if (!response.ok) {
                console.log('ошибка при сбросе пароля' + response.ok);
                return response.json();
            } else {
                return response.json();
            }
        })
        .then((data) => {
            console.log(data)
            if (!data.success) {
                console.log('ошибка при сбросе пароля');
            } else {
                dispatch(resetPasswordSuccess());
            }
        })
        .catch((e) => {
            console.log(e);
        });
};

export const resetPassword: AppThunk = (form: IResetPasswordTypes) => (dispatch: AppDispatch) => {
    fetchResetPasswordRequest(form)
        .then((response) => {
            if (response.message === 'Password successfully reset') {
                dispatch(resetPasswordCompleted());
            }
        })
        .catch((e) => {
            throw new Error(e);
        });
};

export const getUserInfo: AppThunk = () => (dispatch: AppDispatch) => {
    return checkAuthUser()
        .then((response) => {
            if (response) {
                dispatch(setUserInfo(response));
            } else {
                dispatch(loadingUserComplete());
            }
        })
        .catch((e) => {
            console.log(e);
        });
};

export const logOutUser: AppThunk = (callback: () => void) => (dispatch: AppDispatch) => {
    return fetchLogOut()
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Произошла ошибка при получении json fetchLogOut');
            }
        })
        .then((data) => {
            if (data.success) {
                localStorage.removeItem('refreshToken');
                deleteCookie('accessToken');
                dispatch(deleteAuth());
            } else {
                console.log('Произошла ошибка при получении json fetchLogOut');
            }
        })
        .catch((e) => {
            console.log(e);
        });
};

export const updateUserInfo: AppThunk = (form: IUpdateUserTypes, password?: string) => () => {
    fetchUpdateUser(form, password)
        .then((response) => {
            console.log(response);
        })
        .catch((e) => {
            console.log(e);
        });
};

export const loginSuccess = (user: IUserTypes): ILoginSuccess => ({
    type: LOGIN_SUCCESS,
    user: user,
});

export const loginFailed = (): ILoginFailed => ({
    type: LOGIN_FAILED,
});

export const loginOrPasswordIncorrect = (message: string): ILoginOrPasswordIncorrect => ({
    type: LOGIN_OR_PASSWORD_INCORRECT,
    message: message,
});

export const registerUserFailed = (): IRegisterUserFailed => ({
    type: REGISTER_USER_FAILED,
});

export const registerUserSuccess = (user: IUserTypes): IRegisterUserSuccess => ({
    type: REGISTER_USER_SUCCESS,
    payload: user,
});

export const registerUserSetTextError = (message: string): IRegisterUserSetTextError => ({
    type: REGISTER_USER_SET_TEXT_ERROR,
    message: message,
});

export const registerUserClearTextError = (): IRegisterUserClearTextError => ({
    type: REGISTER_USER_CLEAR_TEXT_ERROR,
});

export const resetPasswordSuccess = (): IResetPasswordSuccess => ({
    type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordCompleted = (): IResetPasswordComplete => ({
    type: RESET_PASSWORD_COMPLETED,
});

export const setUserInfo = (userInfo: IUserTypes): ISetUserInfo => ({
    type: SET_USER_INFO,
    payload: userInfo,
});

export const deleteAuth = (): IDeleteAuth => ({
    type: DELETE_AUTH,
});

export const loadingUser = (): ILoadingUser => ({
    type: LOADING_USER,
});

export const loadingUserComplete = (): ILoadingUserComplete => ({
    type: LOADING_USER_COMPLETED,
});
