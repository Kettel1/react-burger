import React from 'react';
import {Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
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
                    <ProfileIcon type={"secondary"}/>
                    <NavLink to='/profile/'
                             className={(props) => {
                                 return `${props.isActive ? HeaderStyles.ActiveText : HeaderStyles.text}`
                             }}>

                        Личный кабинет
                    </NavLink>

                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
