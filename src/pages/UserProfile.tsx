import React, {useCallback, useEffect, useRef, useState} from 'react';
import UserProfileStyles from "./UserProfile.module.scss";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {updateUserInfo} from "../services/actions/auth";
import {RootState} from "../services/reducers";

const UserProfile = () => {
    const [form, setForm] = useState({
        email: '',
        name: '',
    })

    const [password, setPassword] = useState('')

    const [textError, setTextError] = useState({
        email: '',
        password: '',
        name: '',
    })

    const [isError, setIsError] = useState({
        name: false,
        email: false,
        password: false,
    })

    const [disabled, setDisabled] = useState({
        name: true,
        email: true,
        password: true,
    })

    const dispatch = useDispatch()
    const nameRef = useRef<HTMLInputElement>(null!)
    const emailRef = useRef<HTMLInputElement>(null!)


    const {user} = useSelector((state:RootState) => state.auth)

    useEffect(() => {
        setForm({...user})
    }, [user])


    const changeUserName = () => {
        setDisabled({...disabled, name: !disabled.name})

        setTimeout(() => {
            nameRef.current.focus()
        }, 1)

    }

    const changeUserEmail = () => {
        const regExp = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm

        if (disabled.email) {
            setDisabled({...disabled, email: false})

        } else if (!regExp.test(emailRef.current.value)) {
            setTextError({...textError, email: 'Некорректная почта'})
            setIsError({...isError, email: true})
        } else {
            setDisabled({...disabled, email: true})
            setTextError({...textError, email: ''})
            setIsError({...isError, email: false})
        }

        setTimeout(() => {
            emailRef.current.focus()
        }, 1)

    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onSubmit = () => {
        if (!isError.email && !isError.name && !isError.password) {
            dispatch(updateUserInfo(form, password))
        }
    }

    const onCancel = useCallback((e) => {
        e.preventDefault();
        setForm({...user})
        setDisabled({...disabled})
        setIsError({...isError})
        setTextError({...textError})
    },[user])


    return (
        <form onSubmit={onSubmit} className={UserProfileStyles.inputsContainer}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onChange}
                value={form.name}
                disabled={disabled.name}
                name={'name'}
                error={isError.name}
                ref={nameRef}
                errorText={textError.name}
                size={'default'}
                icon={"EditIcon"}
                onIconClick={changeUserName}
            />

            <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={onChange}
                value={form.email}
                disabled={disabled.email}
                name={'email'}
                error={isError.email}
                ref={emailRef}
                errorText={textError.email}
                size={'default'}
                icon={"EditIcon"}
                onIconClick={changeUserEmail}

            />

            <PasswordInput value={password} name={'password'} onChange={onChangePassword} size={"default"}/>

            <div>
                <Button type='secondary' onClick={onCancel}>Отменить</Button>
                <Button type='primary'>Сохранить</Button>
            </div>
        </form>

    );
};


export default UserProfile;
