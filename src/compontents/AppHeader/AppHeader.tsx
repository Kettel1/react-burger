import React from 'react';
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderStyles from './AppHeader.module.scss'
// @ts-ignore
import HeaderButton from "../UI/buttons/HeaderButton/HeaderButton";

const AppHeader = () => {

    // @ts-ignore
    return (
        <header className={HeaderStyles.header}>
            <nav className={HeaderStyles.container}>
                <HeaderButton type={'primary'} icon={'BurgerIcon'}>
                    <span className={HeaderStyles.text}>Конструктор</span>
                </HeaderButton>

                <HeaderButton type={'secondary'} icon={'ListIcon'}>
                    <span className={HeaderStyles.text}>Лента заказов</span>
                </HeaderButton>

                <div style={{margin: '0 auto'}}>
                    <Logo/>
                </div>
                <HeaderButton type={'secondary'} icon={'ProfileIcon'}>
                    <span className={HeaderStyles.text}>Личный кабинет</span>
                </HeaderButton>
            </nav>
        </header>
    );
};

export default AppHeader;
