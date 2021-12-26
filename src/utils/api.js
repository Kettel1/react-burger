import {getCookie, setCookie} from "./helpers";
import {API_REACT} from "./data";

export const checkAuthUser = async () => {
    const accessToken = getCookie('accessToken')

    if (accessToken) {
        const responseFromServer = await fetch(API_REACT + '/auth/user', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('accessToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
        const responseData = await responseFromServer.json()

        if (responseFromServer.ok) {
            return responseData.user
        }

        if (responseData.message === 'jwt expired') {
            console.log('no ok')
            await updateAccessToken()
            return await checkAuthUser()
        }
    }
}

export const updateAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')

    if (refreshToken) {
        const responseFromServer = await fetch(API_REACT + '/auth/token', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: refreshToken
            })
        })

        if (responseFromServer.ok) {
            const responseData = await responseFromServer.json()

            if (responseData.success) {
                setCookie('accessToken', responseData.accessToken)
                localStorage.setItem('refreshToken', responseData.refreshToken)
            } else {
                console.log('updateAccessToken error')
            }
        }
    }
}

export const forgotPasswordRequest = async (form) => {
    return await fetch(API_REACT + '/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: form.email
        })
    })
}

export const fetchResetPasswordRequest = async (form) => {
    return await fetch(API_REACT + '/password-reset/reset', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: form.password,
            token: form.token
        })
    })
}

export const fetchLoginUserRequest = async (form) => {
    return await fetch(API_REACT + '/auth/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    })
}

export const fetchRegisterRequest = async (form) => {
    return await fetch(API_REACT + '/auth/register', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    })
}

export const fetchLogOut = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    return await fetch (API_REACT + '/auth/logout', {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            token: refreshToken
        })
    })
}


export const updateUser = async (form) => {
    const accessToken = getCookie('accessToken')

    if (accessToken) {
        const responseFromServer = await fetch(API_REACT + '/auth/user', {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('accessToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                email: form?.email,
                password: form?.password,
                name: form?.name,
            })
        })
        const responseData = await responseFromServer.json()

        if (responseFromServer.ok) {
            return responseData.user
        }

        if (responseData.message === 'jwt expired') {
            console.log('no ok')
            await updateAccessToken()
            return await checkAuthUser()
        }
    }
}
