import React, {useCallback, useEffect, useRef, useState} from 'react';
import UserProfileStyles from "./UserProfile.module.scss";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {updateUserInfo} from "../services/actions/auth";

const UserProfile = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
    })

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
    const nameRef = useRef(null)
    const emailRef = useRef(null)


    const {user} = useSelector((state => state.auth))

    useEffect(() => {
        setForm({password: '',...user})

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



    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const onSubmit = () => {
        if (!isError.email && !isError.name && !isError.password) {
            dispatch(updateUserInfo(form))
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

            <PasswordInput value={form.password} name={'password'} onChange={onChange} size={"default"}/>

            <div>
                <Button type='secondary' onClick={onCancel}>Отменить</Button>
                <Button type='primary'>Сохранить</Button>
            </div>
        </form>

    );
};


export default UserProfile;
