import React from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import RegisterStyles from './Register.module.scss'
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registerRequest} from "../services/actions/auth";

const Register = () => {
    const [form, setForm] = React.useState({email: '', password: '', name: ''})
    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)

    const navigate = useNavigate()


    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handler = async e => {

        e.preventDefault()
        dispatch(registerRequest(form))
    }

    //
    // React.useEffect(() => {
    //     if(authState.isAuth) {
    //         navigate('/')
    //     }
    // }, [authState.isAuth])

    return (
        <form className={RegisterStyles.container} onSubmit={handler}>

            <h2 className={RegisterStyles.title}>Регистрация</h2>
            <Input
                type={'name'}
                placeholder={'Имя'}
                onChange={onChange}
                value={form.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />

            <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={onChange}
                value={form.email}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />



            <PasswordInput value={form.password} name={'password'} onChange={onChange}/>

            <Button type="primary" size="small">Регистрация</Button>

            <div className={RegisterStyles.recoveryContainer}>
                <p>Уже зарегистрированы<Link to='/login'>Войти</Link></p>
            </div>
        </form>
    );
};

export default Register;
