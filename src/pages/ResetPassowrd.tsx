import React, { FC, useEffect, useState } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import ForgotPasswordStyles from './ResetPassword.module.scss';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/actions/auth';
import { useDispatch, useSelector } from '../services/hooks';

const ResetPassword: FC = () => {
    const [form, setForm] = useState({ password: '', token: '' });

    const authState = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPassword(form));
    };

    useEffect(() => {
        if (!authState.success) {
            navigate('/');
        }
    }, [authState.success, navigate]);

    return (
        <form onSubmit={handler} className={ForgotPasswordStyles.container}>
            <h2 className={ForgotPasswordStyles.title}>Восстановление пароля</h2>
            <PasswordInput value={form.password} name={'password'} onChange={onChange} />

            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={onChange}
                value={form.token}
                name={'token'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />

            <Button type="primary" size="small">
                Сохранить
            </Button>
        </form>
    );
};

export default ResetPassword;
