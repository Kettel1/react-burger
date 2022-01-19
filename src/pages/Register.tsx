import React, {useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import RegisterStyles from './Register.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registerRequest} from "../services/actions/auth";

const Register = () => {
    const [form, setForm] = useState({email: '', password: '', name: ''})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handler = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(registerRequest(form, () => {
            navigate('/', {replace: true})
        }))
    }

    return (
        <form className={RegisterStyles.container} onSubmit={handler} autoComplete='off'>

            <h2 className={RegisterStyles.title}>Регистрация</h2>
            <Input
                type={'text'}
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

            <Button type="primary" size="medium">Зарегистрироваться</Button>

            <div className={RegisterStyles.recoveryContainer}>
                <p className={RegisterStyles.recoveryDescription}>Уже зарегистрированы? <Link
                    className={RegisterStyles.recoveryLink} to='/login'>Войти</Link></p>
            </div>

        </form>
    );
};

export default Register;
