import React, {useCallback} from 'react';
import UserProfileStyles from "./UserProfile.module.scss";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {updateUserInfo} from "../services/actions/auth";

const UserProfile = () => {
    const [form, setForm] = React.useState({
        email: '',
        password: '',
        name: '',
    })

    const [textError, setTextError] = React.useState({
        email: '',
        password: '',
        name: '',
    })

    const [isError, setIsError] = React.useState({
        name: false,
        email: false,
        password: false,
    })

    const [disabled, setDisabled] = React.useState({
        name: true,
        email: true,
        password: true,
    })

    const dispatch = useDispatch()
    const nameRef = React.useRef(null)
    const emailRef = React.useRef(null)
    const passwordRef = React.useRef(null)

    const {user} = useSelector((state => state.auth))

    React.useEffect(() => {
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

    const changeUserPassword = () => {
        setDisabled({...disabled, password: !disabled.password})

        setTimeout(() => {
            passwordRef.current.focus()
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

    const onCancel = useCallback(() => {
        setForm({...user})
        setDisabled({...disabled})
        setIsError({...isError})
        setTextError({...textError})
    }, [user])


    return (
        <div className={UserProfileStyles.inputsContainer}>
            <Input
                type={'name'}
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

            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={onChange}
                value={form.password}
                disabled={disabled.password}
                name={'password'}
                error={isError.password}
                ref={passwordRef}
                errorText={textError.password}
                size={'default'}
                icon={"EditIcon"}
                onIconClick={changeUserPassword}
            />

            <div>
                <Button type='secondary' onClick={onCancel}>Отменить</Button>
                <Button type='primary' onClick={onSubmit}>Сохранить</Button>
            </div>
        </div>

    );
};

export default UserProfile;
