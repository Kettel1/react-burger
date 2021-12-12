import React from 'react';
// @ts-ignore
import BurgerIngredientsStyles from "./RenderBurgerIngredients.module.scss";
import ingredientsTypes from '../../utils/types'
import PropTypes from "prop-types";
import RenderArticleIngredients from '../RenderArticleIngredients/RenderArticleIngredients';
import {useSelector} from "react-redux";

// @ts-ignore
const RenderBurgerIngredients = React.forwardRef((props, ref) => {
    const {ingredients} = useSelector(state => state.ingredients)
    const {type} = props

    const getTitleName = (type) => {
        switch (type){
            case 'bun':
                return 'Булки'
            case 'main':
                return 'Начинки'
            case 'sauce':
                return 'Соусы'
            default:
                return 'Неизвестная начинка'
        }
    }

    return (
        <div ref={ref} className={BurgerIngredientsStyles.ingredientsContainer}>
            <h2 className={BurgerIngredientsStyles.title}>{getTitleName(type)}</h2>
            <div className={BurgerIngredientsStyles.ingredientsBlock}>
                {ingredients.map((item) => {
                    if (item.type === type) {
                        return <RenderArticleIngredients item={item} key={item._id}/>
                    }
                })}
            </div>
        </div>
    )
});


RenderBurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientsTypes.isRequired).isRequired,
    type: PropTypes.string.isRequired
}

export default RenderBurgerIngredients;
