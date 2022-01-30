import React, {FC} from 'react';
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderStyles from './AppHeader.module.scss'
import {NavLink} from "react-router-dom";

const AppHeader: FC = () => {
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

                    <NavLink to='/feed'
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
