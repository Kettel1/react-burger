import React from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import RegisterStyles from './Register.module.scss'
import {Link, Navigate, useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {forgotPassword, resetPassword} from "../services/actions/auth"

const ForgotPassword = () => {
    const [form, setForm] = React.useState({email: ''})

    const authState = useSelector((state => state.auth))

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handler = async e => {
        e.preventDefault()

        dispatch(forgotPassword(form))
    }

    React.useEffect(() => {
        if(authState.success) {
            navigate('/reset-password')
        }
    }, [authState.success])



    return (
        <form className={RegisterStyles.container} onSubmit={handler}>

            <h2 className={RegisterStyles.title}>Восстановление пароля</h2>
            <Input
                type={'name'}
                placeholder={'Укажите e-mail'}
                onChange={onChange}
                value={form.name}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />

            <Button type="primary" size="small">Восстановить</Button>

            <div className={RegisterStyles.recoveryContainer}>
                <p>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
            </div>
        </form>
    );
};

export default ForgotPassword;
