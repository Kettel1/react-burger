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

    const renderArticleIngredients = (item: any) => {
        return (
            <article className={BurgerIngredientsStyles.ingredientsBlockInner} key={item.id}>
                <img src={item.image} alt={item.name}/>
                <div className={BurgerIngredientsStyles.priceBlock}>
                    <span className={BurgerIngredientsStyles.priceValue}>{item.price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={BurgerIngredientsStyles.name}>{item.name}</p>
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
                        return renderArticleIngredients(item)
                    }
                })}
            </div>
        </div>
    )
};



export default RenderBurgerIngredients;
