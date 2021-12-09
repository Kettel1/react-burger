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

    let titleName = '';
    if (type === 'bun') {
        titleName += 'Булки'
    } else if (type === 'main') {
        titleName = 'Начинки'
    } else {
        titleName += 'Соусы'
    }

    return (
        <div ref={ref} className={BurgerIngredientsStyles.ingredientsContainer}>
            <h2 className={BurgerIngredientsStyles.title}>{titleName}</h2>
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
