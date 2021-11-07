import React from 'react';
// @ts-ignore
import BurgerIngredientsStyles from "./RenderBurgerIngredients.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


// @ts-ignore
const RenderBurgerIngredients = ({ data, type }) => {
    let titleName = '';
    if (type === 'bun') {
        titleName += 'Булки'
    } else if (type === 'main') {
        titleName = 'Начинки'
    } else if (type === 'sauce') {
        titleName += 'Соусы'
    }

    // @ts-ignore
    const RenderArticleIngredients = (props) => {
        return (
            <article className={BurgerIngredientsStyles.ingredientsBlockInner}>
                <img src={props.item.image} alt={props.item.name}/>
                <div className={BurgerIngredientsStyles.priceBlock}>
                    <span className={BurgerIngredientsStyles.priceValue}>{props.item.price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={BurgerIngredientsStyles.name}>{props.item.name}</p>
            </article>
        )
    }


    // @ts-ignore
    return (
        <div className={BurgerIngredientsStyles.ingredientsContainer}>
            <h2>{titleName}</h2>
            <div className={BurgerIngredientsStyles.ingredientsBlock}>
                {data.map((item: any) => {
                    if (item.type === type) {
                        // @ts-ignore
                        return <RenderArticleIngredients item={item} key={item._id}/>
                    }
                })}
            </div>
        </div>
    )
};


export default RenderBurgerIngredients;
