import React from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import LoginStyles from './Login.module.scss'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUserRequest} from "../services/actions/auth";

const Login = () => {
    const [form, setForm] = React.useState({email: '', password: ''})
    const emailRef = React.useRef(null)

    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/'

    // const fromPage = lo

    const dispatch = useDispatch()
    const authState = useSelector((state => state.auth))

    const handler = e => {
        e.preventDefault()
        dispatch(loginUserRequest(form, () => {
            navigate(fromPage, {replace: true})
        }))
    }

    // React.useEffect(() => {
    //     if(authState.isAuth) {
    //         navigate('/')
    //     }
    // }, [authState.isAuth])

    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }


    return (
        <form onSubmit={handler} className={LoginStyles.container}>
            <h2 className={LoginStyles.title}>Вход</h2>
            <Input
                type={'text'}
                placeholder={'E-mail'}
                icon={'CurrencyIcon'}
                value={form.email}
                name={'email'}
                error={false}
                onChange={onChange}
                ref={emailRef}
                errorText={'Ошибка'}
                size={'default'}
            />

            <PasswordInput value={form.password} name={'password'} onChange={onChange}/>

            <Button type="primary" size="small" onClick={handler}>Войти</Button>

            <div className={LoginStyles.recoveryContainer}>
                <p>Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
                <p>Забыли пароль? <Link to='/register'>Восстановить пароль</Link></p>
            </div>
        </form>
    );
};

export default Login;
