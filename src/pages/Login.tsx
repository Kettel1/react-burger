import React, { FC, useEffect, useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import LoginStyles from './Login.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUserRequest } from '../services/actions/auth';
import { useDispatch, useSelector } from '../services/hooks';
import { useHistory } from 'react-router';

const Login: FC = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { errorMessage } = useSelector((state) => state.auth);

    useEffect(() => {
        if (errorMessage) {
            setError(errorMessage);
        }
    }, [errorMessage]);

    const handler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.email && form.password) {
            setError('');
            dispatch(
                loginUserRequest(form, () => {
                    navigate('');
                })
            );
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email' && e.target.value.length > 3) {
            setError('');
        }
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handler} className={LoginStyles.container}>
            <h2 className={LoginStyles.title}>Вход</h2>

            <div className={LoginStyles.loginFiled}>
                <Input
                    type={'text'}
                    placeholder={'E-mail'}
                    value={form.email}
                    name={'email'}
                    onChange={onChange}
                    size={'default'}
                />

                <PasswordInput value={form.password} name={'password'} onChange={onChange} />
            </div>
            {error && <p className={LoginStyles.errorMessage}>{error}</p>}

            <Button type="primary" size="medium">
                Войти
            </Button>

            <div className={LoginStyles.recoveryContainer}>
                <p className={LoginStyles.recoveryDescription}>
                    Вы - новый пользователь?{' '}
                    <Link className={LoginStyles.recoveryLink} to="/register">
                        Зарегистрироваться
                    </Link>
                </p>
                <p className={LoginStyles.recoveryDescription}>
                    Забыли пароль?{' '}
                    <Link className={LoginStyles.recoveryLink} to="/forgot-password">
                        Восстановить пароль
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default Login;
