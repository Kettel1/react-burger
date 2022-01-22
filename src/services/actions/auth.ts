import {deleteCookie, setCookie} from "../../utils/helpers";
import {
    fetchRegisterRequest,
    fetchLoginUserRequest,
    fetchResetPasswordRequest,
    checkAuthUser,
    fetchLogOut,
    fetchForgotPasswordRequest,
    fetchUpdateUser
} from "../../utils/api";
import {
    IForgotPasswordUserTypes,
    ILoginUserTypes,
    IRegisterUserTypes, IResetPasswordTypes,
    IUpdateUserTypes
} from "../../types/ingredientTypes";
import {
    deleteAuth, loadingUserComplete,
    loginFailed,
    loginOrPasswordIncorrect,
    loginSuccess, registerUserClearTextError,
    registerUserFailed, registerUserSetTextError,
    registerUserSuccess, resetPasswordComplete, resetPasswordSuccess, setUserInfo
} from "../reducers/auth";


export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_SET_TEXT_ERROR = 'REGISTER_USER_SET_TEXT_ERROR'
export const REGISTER_USER_CLEAR_TEXT_ERROR = 'REGISTER_USER_CLEAR_TEXT_ERROR'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_OR_PASSWORD_INCORRECT = 'LOGIN_OR_PASSWORD_INCORRECT'
export const LOGIN_FAILED = 'LOGIN_FAILED'

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'
export const RESET_PASSWORD_COMPLETED = 'RESET_PASSWORD_COMPLETED'

export const SET_USER_INFO = 'SET_USER_INFO'

export const DELETE_AUTH = 'DELETE_AUTH'

export const LOADING_USER = 'LOADING_USER'
export const LOADING_USER_COMPLETED = 'LOADING_USER_COMPLETED'

// Подскажите, как можно типизировать диспатч
export const loginUserRequest = (form: ILoginUserTypes, callback: () => void) => (dispatch: any): void => {
    fetchLoginUserRequest(form)
        .then(response => {
            if (!response.ok) {
                dispatch(loginFailed())
                return response.json()
            } else {
                return response.json()
            }
        })
        .then(userInfo => {
            if (userInfo.message === 'email or password are incorrect') {
                dispatch(loginOrPasswordIncorrect('Почта или пароль введены неверно'))
            } else {
                setCookie('accessToken', userInfo.accessToken)
                localStorage.setItem('refreshToken', userInfo.refreshToken)
                dispatch(loginSuccess(userInfo))
                callback()
            }
        });
};

export const registerRequest = (form: IRegisterUserTypes, callback: () => void) => (dispatch: any): void => {
    fetchRegisterRequest(form)
        .then(response => {
            if (!response.ok) {
                dispatch(registerUserFailed())
                return response.json()
            } else {
                return response.json()
            }
        })
        .then(userInfo => {
            if (userInfo.success) {
                dispatch(registerUserClearTextError())
                setCookie('accessToken', userInfo.accessToken)
                localStorage.setItem('refreshToken', userInfo.refreshToken)
                dispatch(registerUserSuccess(userInfo))
                callback()
            } else {
                if (userInfo.message === 'User already exists') {
                    dispatch(registerUserSetTextError('Пользователь с такой почтой уже зарегистрирован'))
                }
            }
        })
};

export const forgotPassword = (form: IForgotPasswordUserTypes) => (dispatch: any): void => {
    fetchForgotPasswordRequest(form)
        .then(response => {
            if (!response.ok) {
                console.log('ошибка при сбросе пароля' + response.ok)
                return response.json()
            } else {
                return response.json()
            }
        })
        .then(data => {
            if (!data.success) {
                console.log('ошибка при сбросе пароля')
            } else {
                dispatch(resetPasswordSuccess())
            }
        })
        .catch(e => {
            throw new Error(e)
        })
}

export const resetPassword = (form: IResetPasswordTypes) => (dispatch: any): void => {
    fetchResetPasswordRequest(form)
        .then(response => {
            if (response.message === 'Password successfully reset') {
                dispatch(resetPasswordComplete())
            }
        })
        .catch(e => {
            throw new Error(e)
        })
}

export const getUserInfo = () => (dispatch: any) => {
    //TODO Сделать проверку на отсутствие refreshToken
    //TODO При его отсутсвтии ломается приложение

    checkAuthUser()
        .then(response => {
            if (response === undefined) {
                dispatch(loadingUserComplete())
            }
            if (response !== undefined) {
                dispatch(setUserInfo(response))
            }
        })
        .catch(e => {
            throw new Error(e)
        })
}

export const logOutUser = (callback: () => void) => (dispatch: any) => {
    fetchLogOut()
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Произошла ошибка при получении json fetchLogOut')
            }
        })
        .then(data => {
            if (data.success) {
                localStorage.removeItem('refreshToken')
                deleteCookie('accessToken')
                callback()
                dispatch(deleteAuth())
            } else {
                throw new Error('Произошла ошибка при получении json fetchLogOut')
            }
        })
        .catch(e => {
            throw new Error(e)
        })
}

export const updateUserInfo = (form: IUpdateUserTypes, password?:string) => () => {
    fetchUpdateUser(form, password)
        .then(response => {
            console.log(response)
        })
        .catch(e => {
            throw new Error(e)
        })
}
