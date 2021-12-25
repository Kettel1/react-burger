import React, {useRef, useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import LoginStyles from './Login.module.scss'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUserRequest} from "../services/actions/auth";

const Login = () => {
    const [form, setForm] = useState({email: '', password: ''})
    const emailRef = useRef(null)

    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/'


    const dispatch = useDispatch()

    const handler = e => {
        e.preventDefault()
        if (form.email && form.password) {
            dispatch(loginUserRequest(form, () => {
                navigate(fromPage, {replace: true})
            }))
        }
    }

    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={handler} className={LoginStyles.container}>
            <h2 className={LoginStyles.title}>Вход</h2>
            <Input
                type={'text'}
                placeholder={'E-mail'}
                value={form.email}
                name={'email'}
                error={false}
                onChange={onChange}
                ref={emailRef}
                errorText={'Ошибка'}
                size={'default'}
            />

            <PasswordInput value={form.password} name={'password'} onChange={onChange}/>

            <Button type="primary" size="medium">Войти</Button>

            <div className={LoginStyles.recoveryContainer}>
                <p className={LoginStyles.recoveryDescription}>Вы - новый пользователь? <Link className={LoginStyles.recoveryLink} to='/register'>Зарегистрироваться</Link></p>
                <p className={LoginStyles.recoveryDescription}>Забыли пароль? <Link className={LoginStyles.recoveryLink} to='/forgot-password'>Восстановить пароль</Link></p>
            </div>
        </form>
    );
};

export default Login;
