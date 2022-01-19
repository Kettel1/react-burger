import React, {FC, useEffect, useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import LoginStyles from './Login.module.scss'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUserRequest} from "../services/actions/auth";
import {RootState} from "../services/reducers";


const Login: FC = () => {
    const [form, setForm] = useState({email: '', password: ''})
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location: any = useLocation()
    //Подскажите как можно типизировать это
    const fromPage = location.state?.from?.pathname || '/'

    const dispatch = useDispatch()

    const {errorMessage} = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (errorMessage) {
            setError(errorMessage)
        }
    }, [errorMessage])

    const handler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (form.email && form.password) {
            setError('')
            dispatch(loginUserRequest(form, () => {
                navigate(fromPage, {replace: true})
            }))
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email' && e.target.value.length > 3) {
            setError('')
        }
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
                onChange={onChange}
                size={'default'}
            />

            <PasswordInput value={form.password} name={'password'} onChange={onChange}/>

            {error && (<p className={LoginStyles.errorMessage}>{error}</p>)}

            <Button type="primary" size="medium">Войти</Button>

            <div className={LoginStyles.recoveryContainer}>
                <p className={LoginStyles.recoveryDescription}>Вы - новый пользователь? <Link
                    className={LoginStyles.recoveryLink} to='/register'>Зарегистрироваться</Link></p>
                <p className={LoginStyles.recoveryDescription}>Забыли пароль? <Link className={LoginStyles.recoveryLink}
                                                                                    to='/forgot-password'>Восстановить
                    пароль</Link></p>
            </div>
        </form>
    );
};

export default Login;
