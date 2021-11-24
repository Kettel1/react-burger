import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import React from 'react';
import HeaderButtonStyles from './HeaderButton.module.scss'
import PropTypes from "prop-types";


// @ts-ignore
const HeaderButton = ({ type, icon, children }) => {
    function checkClassName() {
        switch (type) {
            case 'secondary':
                return HeaderButtonStyles.button__secondary
            case 'primary':
                return HeaderButtonStyles.button__primary
        }
    }

    function checkTextColor() {
        switch (type) {
            case 'secondary':
                return 'secondary'
            case 'primary':
                return 'primary'
        }
    }

    function checkColorIcon() {
        switch (icon) {
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

    return (
        <button className={checkClassName()}>
            {checkColorIcon()}
            {children}
        </button>
    );
};

HeaderButton.propType = {
    type: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    children: PropTypes.element
}



export default HeaderButton;
