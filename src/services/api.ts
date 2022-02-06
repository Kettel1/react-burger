import { deleteCookie, getCookie, setCookie } from './helpers';
import { API_REACT } from './url';
import {
    CustomResponse,
    IForgotPasswordUserTypes,
    ILoginUserTypes,
    IRegisterUserTypes,
    IResetPasswordTypes,
    IUpdateUserTypes,
} from '../types/ingredientTypes';

export const checkAuthUser = async (): Promise<void> => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
        const responseFromServer = await fetch(API_REACT + '/auth/user', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
        const responseData = await responseFromServer.json();

        console.log(responseData);

        if (responseFromServer.ok) {
            console.log('Токен ок');
            return responseData.user;
        } else {
            console.log('Токен стух');
        }

        if (responseData.message === 'jwt expired') {
            await updateAccessToken();
            return await checkAuthUser();
        }
    }
};

export const updateAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('Попытка обновления токена');

    if (refreshToken) {
        const responseFromServer = await fetch(API_REACT + '/auth/token', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: refreshToken,
            }),
        });
        console.log('refreshToken Есть');

        if (responseFromServer.ok) {
            console.log('updateAccessToken ok');
            const responseData = await responseFromServer.json();

            console.log(responseData);

            if (responseData.success) {
                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');

                console.log(responseData);

                setCookie('accessToken', responseData.accessToken);
                localStorage.setItem('refreshToken', responseData.refreshToken);
            } else {
                console.log('updateAccessToken error');
            }
        } else {
            console.log(responseFromServer.json());
            console.log('updateAccessToken error2');
        }
    } else {
        console.log('refreshToken отсутствует');
    }
};

export const fetchForgotPasswordRequest = async (form: IForgotPasswordUserTypes) => {
    return await fetch(API_REACT + '/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: form.email,
        }),
    });
};

export const fetchResetPasswordRequest = async (form: IResetPasswordTypes): Promise<CustomResponse> => {
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
            token: form.token,
        }),
    });
};

export const fetchLoginUserRequest = async (form: ILoginUserTypes) => {
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
        body: JSON.stringify(form),
    });
};

export const fetchRegisterRequest = async (form: IRegisterUserTypes) => {
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
        body: JSON.stringify(form),
    });
};

export const fetchLogOut = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    return await fetch(API_REACT + '/auth/logout', {
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
            token: refreshToken,
        }),
    });
};

export const fetchUpdateUser = async (form: IUpdateUserTypes, password?: string) => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
        const responseFromServer = await fetch(API_REACT + '/auth/user', {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                email: form?.email,
                password: password,
                name: form?.name,
            }),
        });
        const responseData = await responseFromServer.json();

        if (responseFromServer.ok) {
            return responseData.user;
        }

        if (responseData.message === 'jwt expired') {
            console.log('no ok');
            await updateAccessToken();
            return await checkAuthUser();
        }
    }
};
