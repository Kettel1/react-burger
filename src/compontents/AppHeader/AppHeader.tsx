import React from 'react';
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderStyles from './AppHeader.module.scss'
// @ts-ignore
import HeaderButton from "../UI/buttons/HeaderButton/HeaderButton";
import {NavLink} from "react-router-dom";

const AppHeader = () => {
    return (
        <header className={HeaderStyles.header}>
            <nav className={HeaderStyles.container}>

                <div className={HeaderStyles.firstBtnContainer}>
                    <HeaderButton type={'primary'} icon={'BurgerIcon'}>
                        <NavLink
                            to='/'
                            className={(props) => {
                                return `${props.isActive ? HeaderStyles.ActiveText : HeaderStyles.text}`
                            }}
                        >Конструктор</NavLink>
                    </HeaderButton>
                    <HeaderButton type={'secondary'} icon={'ListIcon'}>
                        <span className={HeaderStyles.text}>Лента заказов</span>
                    </HeaderButton>
                </div>


                <div className={HeaderStyles.logo}>
                    <NavLink to='/'>
                        <Logo/>
                    </NavLink>
                </div>

                <div className={HeaderStyles.loginContainer}>
                    <NavLink to='/profile/'
                             className={(props) => {
                                 return `${props.isActive ? HeaderStyles.ActiveText : HeaderStyles.text}`
                             }}>
                        <HeaderButton type={'secondary'} icon={'ProfileIcon'}>
                            Личный кабинет
                        </HeaderButton>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
