import { authReducer } from './auth';
import { IAuthState } from '../../types/authTypes';
import {
    deleteAuth, forgotPassword, getUserInfo,
    loadingUser,
    loadingUserComplete,
    loginFailed,
    loginOrPasswordIncorrect,
    loginSuccess,
    loginUserRequest, logOutUser, registerRequest, registerUserClearTextError,
    registerUserFailed,
    registerUserSetTextError,
    registerUserSuccess,
    resetPasswordCompleted,
    resetPasswordSuccess,
    setUserInfo
} from '../actions/auth';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

const initialState: IAuthState = {
    isLoading: true,
    errorMessage: '',
    isAuth: false,
    user: {
        email: '',
        name: ''
    },
    success: false
};

describe('auth reducer', () => {
    const randomMail = `${Math.random()}@postmailgoogleyahooyandex.ru`

    afterEach(() => {
        fetchMock.restore();
    });


    it('should return state', () => {
        expect(authReducer(undefined, {} as any)).toEqual({
            ...initialState
        });
    });

    it('should return login success', () => {
        expect(authReducer(undefined, loginSuccess({ name: 'Kettel', email: 'test@email.ru' }))).toEqual({
            ...initialState,
            isAuth: true,
            user: {
                name: 'Kettel',
                email: 'test@email.ru'
            }
        });
    });

    it('should return login failed', () => {
        expect(authReducer(undefined, loginFailed())).toEqual({
            ...initialState,
            success: false,
            isLoading: false
        });
    });

    it('should return login or password incorrect', () => {
        expect(authReducer(undefined, loginOrPasswordIncorrect('error'))).toEqual({
            ...initialState,
            success: false,
            isLoading: false,
            errorMessage: 'error'
        });
    });

    it('should return register user failed', () => {
        expect(authReducer(undefined, registerUserFailed())).toEqual({
            ...initialState,
            success: false,
            isLoading: false
        });
    });

    it('should return register user success', () => {
        expect(authReducer(undefined, registerUserSuccess({ name: 'test', email: 'test@email.ru' }))).toEqual({
            ...initialState,
            user: {
                name: 'test',
                email: 'test@email.ru'
            }
        });
    });

    it('should return register user text error', () => {
        expect(authReducer(undefined, registerUserSetTextError('error'))).toEqual({
            ...initialState,
            errorMessage: 'error'
        });
    });

    it('should return reset password success', () => {
        expect(authReducer(undefined, resetPasswordSuccess())).toEqual({
            ...initialState,
            success: true
        });
    });

    it('should return reset password completed', () => {
        expect(authReducer(undefined, resetPasswordCompleted())).toEqual({
            ...initialState,
            success: false
        });
    });

    it('should set user info', () => {
        expect(authReducer(undefined, setUserInfo({ name: 'test', email: 'test@email.ru' }))).toEqual({
            ...initialState,
            user: {
                name: 'test',
                email: 'test@email.ru'
            },
            isAuth: true,
            isLoading: false
        });
    });

    it('should delete auth user', () => {
        expect(authReducer(undefined, deleteAuth())).toEqual({
            ...initialState,
            isLoading: false
        });
    });

    it('should loading user', () => {
        expect(authReducer(undefined, loadingUser())).toEqual({
            ...initialState,
            isLoading: true
        });
    });

    it('should loading user completed', () => {
        expect(authReducer(undefined, loadingUserComplete())).toEqual({
            ...initialState,
            isLoading: false
        });
    });

    // Async actions
    it('success login', () => {
        const expectedUser = {
            email: 'mr.korovin87@mail.ru',
            name: 'Kettel'
        };

        const form = {
            email: 'mr.korovin87@mail.ru',
            password: 'qwerty1'
        };

        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        const expectedAction = [
            loginSuccess(expectedUser),
            loginFailed(),
            loginOrPasswordIncorrect('Почта или пароль введены неверно')
        ];

        const store = mockStore({});

        return store.dispatch(loginUserRequest(form) as any).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    it('login error', () => {
        const form = {
            email: 'mr.korov@email.r@@#azu',
            password: 'qasdasd3@#$!ASdzxc'
        };

        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        const expectedAction = [
            loginFailed(),
            loginOrPasswordIncorrect('Почта или пароль введены неверно')
        ];

        const store = mockStore({});

        return store.dispatch(loginUserRequest(form) as any).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    });

    it('register success', () => {
        const form = {
            email: randomMail,
            password: 'qwerty1',
            name: 'anything'
        };

        const user = {
            email: randomMail,
            name: 'anything'
        }

        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        const expectedAction = [
            registerUserClearTextError(),
            registerUserSuccess(user)
        ];

        const store = mockStore({});

        return store.dispatch(registerRequest(form) as any).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })

    it('register error', () => {
        const form = {
            email: 'mr.korovin87@mail.ru',
            password: 'test1',
            name: 'test1'
        };

        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        const expectedAction = [
            registerUserFailed(),
            registerUserSetTextError('Пользователь с такой почтой уже зарегистрирован')

        ];

        const store = mockStore({});

        return store.dispatch(registerRequest(form) as any).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })

    it('forgot password success', () => {
        const form = {
            email: 'test@mail.ru',
        };

        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        const expectedAction = [
            resetPasswordSuccess()
        ];

        const store = mockStore({});

        return store.dispatch(forgotPassword(form) as any).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })

    it('get user info success', () => {
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        const expectedAction = [
            setUserInfo({name: 'anything', email: randomMail})
        ];

        const store = mockStore({});

        return store.dispatch(getUserInfo() as any).then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        });
    })

    it('logout test', () => {
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        const expectedAction = [
            deleteAuth()
        ];

        const store = mockStore({});

        return store.dispatch(logOutUser() as any).then(() => {
            expect(store.getActions()).toEqual(expectedAction)
        });
    })
});




