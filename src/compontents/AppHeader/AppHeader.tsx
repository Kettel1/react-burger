import React from 'react';
import {
    BurgerIcon,
    InfoIcon,
    ListIcon,
    Logo,
    MenuIcon,
    ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderStyles from './AppHeader.module.scss'
// @ts-ignore
import HeaderButton from "../UI/buttons/HeaderButton/HeaderButton";
import {NavLink} from "react-router-dom";

const AppHeader = () => {
    return (
        <header className={HeaderStyles.header}>
            <nav className={HeaderStyles.container}>

                <div className={HeaderStyles.firstBtnContainer}>

                    <NavLink
                        to='/'
                        className={(props) => {
                            return `${props.isActive ? HeaderStyles.ActiveText : HeaderStyles.text}`
                        }}
                    >
                        <BurgerIcon type={'secondary'}/>
                        <span>Конструктор</span>
                    </NavLink>

                    <NavLink to='/orders'
                             className={(props) => {
                                 return `${props.isActive ? HeaderStyles.ActiveText : HeaderStyles.text}`
                             }}
                    >
                        <ListIcon type={'secondary'}/>
                        <span>Лента заказов</span>
                    </NavLink>
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
                             }}
                    >
                        <ProfileIcon type={'secondary'}/>
                        <span>Личный кабинет</span>
                    </NavLink>

                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
