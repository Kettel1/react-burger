import React from 'react';
// @ts-ignore
import BurgerIngredientsStyles from "./RenderBurgerIngredients.module.scss";
import ingredientsTypes from '../../utils/types'
import PropTypes from "prop-types";
import RenderArticleIngredients from '../RenderArticleIngredients/RenderArticleIngredients';



// @ts-ignore
const RenderBurgerIngredients = ({ data, type }) => {

    let titleName = '';
    if (type === 'bun') {
        titleName += 'Булки'
    } else if (type === 'main') {
        titleName = 'Начинки'
    } else  {
        titleName += 'Соусы'
    }

    return (
        <div className={BurgerIngredientsStyles.ingredientsContainer}>
            <h2>{titleName}</h2>
            <div className={BurgerIngredientsStyles.ingredientsBlock}>
                {data.map((item: any) => {
                    if (item.type === type) {
                        return <RenderArticleIngredients item={item} key={item._id}/>
                    }
                })}
            </div>
        </div>
    )
};


RenderBurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientsTypes.isRequired).isRequired,
    type: PropTypes.string.isRequired
}

export default RenderBurgerIngredients;
