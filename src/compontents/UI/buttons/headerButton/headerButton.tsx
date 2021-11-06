import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import React from 'react';
// @ts-ignore
import headerButtonStyles from './headerButton.module.css'


// @ts-ignore
const HeaderButton = (props) => {
    // @ts-ignore
    function checkClassName() {
        switch (props.type) {
            case 'secondary':
                return headerButtonStyles.button__secondary
            case 'primary':
                return headerButtonStyles.button__primary
        }
    }

    function checkTextColor() {
        switch (props.type) {
            case 'secondary':
                return 'secondary'
            case 'primary':
                return 'primary'
        }
    }

    function checkColorIcon() {
        switch (props.icon) {
            case 'BurgerIcon':
                // @ts-ignore
                return <BurgerIcon type={checkTextColor()}/>
            case 'ListIcon':
                // @ts-ignore
                return <ListIcon type={checkTextColor()}/>
            case 'ProfileIcon':
                // @ts-ignore
                return <ProfileIcon type={checkTextColor()}/>
        }
    }


    // @ts-ignore
    return (
        <button className={checkClassName()}>
            {checkColorIcon()}
            {props.children}
        </button>
    );
};

export default HeaderButton;
