import React from 'react';
import ReactDOM from "react-dom";
import {BurgerIcon, Logo} from "@ya.praktikum/react-developer-burger-ui-components";
// @ts-ignore
import headerStyles from './appHeader.module.css'
import HeaderButton from "../UI/buttons/headerButton/headerButton";

const AppHeader = () => {
    // @ts-ignore
    return (
        <header className={headerStyles.header}>
            <nav className={headerStyles.container}>
                <HeaderButton type={'primary'} icon={'BurgerIcon'}>
                    <span className={headerStyles.text}>Конструктор</span>
                </HeaderButton>

                <HeaderButton type={'secondary'} icon={'ListIcon'}>
                    <span className={headerStyles.text}>Лента заказов</span>
                </HeaderButton>

                <div style={{margin: '0 auto'}}>
                    <Logo/>
                </div>
                <HeaderButton type={'secondary'} icon={'ProfileIcon'}>
                    <span className={headerStyles.text}>Личный кабинет</span>
                </HeaderButton>
            </nav>
        </header>
    );
};

export default AppHeader;
