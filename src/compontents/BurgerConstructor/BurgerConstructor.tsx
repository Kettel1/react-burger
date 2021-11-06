import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import React from 'react';
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructor.module.css"
import TotalBasketCount from "../TotalBasketCount/TotalBasketCount";
import PropTypes from "prop-types";

// @ts-ignore
const BurgerConstructor = ({ingredients}) => {


    const img = 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
    // @ts-ignore
    return (
        <section className={BurgerConstructorStyles.container}>
            <ul className={BurgerConstructorStyles.list}>
                <li className={BurgerConstructorStyles.item}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                </li>
                {ingredients.map((item: any) => {
                    // @ts-ignore
                    return <li className={BurgerConstructorStyles.item}>
                        <DragIcon type={"primary"}/>
                        <ConstructorElement key={item.id} text={item.name} price={item.price} thumbnail={item.image_mobile}/>
                    </li>
                })}
                <li className={BurgerConstructorStyles.item}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={img}
                    />
                </li>
            </ul>
            <TotalBasketCount/>
        </section>
    )
};

BurgerConstructor.propTypes = {
    id: PropTypes.string,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string
}

export default BurgerConstructor;
