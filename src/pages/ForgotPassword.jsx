import React, {useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import ForgotPasswordStyles from './ForgotPassword.module.scss'
import {Link, useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {forgotPassword} from "../services/actions/auth"

const ForgotPassword = () => {
    const [form, setForm] = useState({email: ''})

    const authState = useSelector((state => state.auth))

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handler = e => {
        e.preventDefault()

        dispatch(forgotPassword(form))
    }

    React.useEffect(() => {
        if(authState.success) {
            navigate('/reset-password')
        }
    }, [authState.success, navigate])



    return (
        <form className={ForgotPasswordStyles.container} onSubmit={handler}>

            <h2 className={ForgotPasswordStyles.title}>Восстановление пароля</h2>

            <Input
                type={'email'}
                placeholder={'Укажите e-mail'}
                onChange={onChange}
                value={form.email}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />

            <Button type="primary" size="medium">Восстановить</Button>

            <div className={ForgotPasswordStyles.recoveryContainer}>
                <p className={ForgotPasswordStyles.recoveryDescription}>Вспомнили пароль? <Link className={ForgotPasswordStyles.recoveryLink} to='/login'>Войти</Link></p>
            </div>
        </form>
    );
};

export default ForgotPassword;
