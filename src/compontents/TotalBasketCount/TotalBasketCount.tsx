import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import TotalBasketCountStyles from './TotalBasketCount.module.css'

// @ts-ignore
const TotalBasketCount = () => {



    return (
        <div className={TotalBasketCountStyles.container}>
            <div className={TotalBasketCountStyles.priceBlock}>
                <span className={TotalBasketCountStyles.priceValue}>600</span>
                <CurrencyIcon  type="primary"/>
            </div>
            <Button type="primary" size="large">Оформить заказ</Button>
        </div>
    );
};

export default TotalBasketCount;
