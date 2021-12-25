import {deleteCookie, setCookie} from "../../utils/helpers";
import {
    forgotPasswordRequest,
    fetchRegisterRequest,
    fetchLoginUserRequest,
    fetchResetPasswordRequest, checkAuthUser, fetchLogOut, updateUser
} from "../../utils/api";


export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'
export const RESET_PASSWORD_COMPLETED = 'RESET_PASSWORD_COMPLETED'

export const SET_USER_INFO = 'SET_USER_INFO'

export const DELETE_AUTH = 'DELETE_AUTH'

export const LOADING_USER = 'LOADING_USER'
export const LOADING_USER_COMPLETED = 'LOADING_USER_COMPLETED'


export const loginUserRequest = (form, cb) => (dispatch) => {
    fetchLoginUserRequest(form)
        .then(response => {
            if (!response.ok) {
                dispatch({type: LOGIN_FAILED})
            } else {
                return response.json()
            }
        })
        .then(userInfo => {
            setCookie('accessToken', userInfo.accessToken)
            localStorage.setItem('refreshToken', userInfo.refreshToken)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: userInfo
            })
            cb()
        });
};

export const registerRequest = (form) => (dispatch) => {
    fetchRegisterRequest(form)
        .then(response => {
            if (!response.ok) {
                dispatch({type: REGISTER_USER_FAILED})
            } else {
                return response.json()
            }
        })
        .then(userInfo => {
            console.log(userInfo.refreshToken)
            setCookie('accessToken', userInfo.accessToken)
            localStorage.setItem('refreshToken', userInfo.refreshToken)
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: userInfo
            })
        });
};

export const forgotPassword = (form) => (dispatch) => {
    forgotPasswordRequest(form)
        .then(response => {
            if (!response.ok) {
                dispatch({type: RESET_PASSWORD_FAILED})
            } else {
                return response.json()
            }
        })
        .then(data => {
            if (!data.success) {
                dispatch({type: RESET_PASSWORD_FAILED})
            } else {
                dispatch({type: RESET_PASSWORD_SUCCESS})
            }
        })
}

export const resetPassword = (form) => (dispatch) => {
    fetchResetPasswordRequest(form)
        .then(response => {

            if (response.message === 'Password successfully reset') {
                dispatch({type: RESET_PASSWORD_COMPLETED})
            }
        })
}

export const getUserInfo = () => (dispatch) => {
    checkAuthUser()
        .then(response => {

            dispatch({type: LOADING_USER})


            if (response === undefined) {
                console.log('undefined')

                dispatch({type: LOADING_USER_COMPLETED})
            }

            if (response !== undefined) {
                console.log('unundef')
                dispatch({type: SET_USER_INFO, payload: response})
            }
        })
}

export const logOutUser = () => (dispatch) => {
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
                console.log('data success')
                localStorage.removeItem('refreshToken')
                deleteCookie('accessToken')
                dispatch({type: DELETE_AUTH})
            } else {
                throw new Error('Произошла ошибка при получении json fetchLogOut')
            }
        })
        .catch(error => {
            throw new Error(error)
        })
}

export const updateUserInfo = (form) => (dispatch) => {
    updateUser(form)
        .then(response => {
            console.log(response)
        })
}
