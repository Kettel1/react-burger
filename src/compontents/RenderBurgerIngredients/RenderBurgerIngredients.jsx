import React from 'react';
// @ts-ignore
import BurgerIngredientsStyles from "./RenderBurgerIngredients.module.scss";
import ingredientsTypes from '../../utils/types'
import PropTypes from "prop-types";
import RenderArticleIngredients from '../RenderArticleIngredients/RenderArticleIngredients';
import {CartContext} from "../../services/CartContext";




// @ts-ignore
const RenderBurgerIngredients = ({ data, type }) => {
    const [cartState, setCartState] = React.useContext(CartContext)

    let titleName = '';
    if (type === 'bun') {
        titleName += 'Булки'
    } else if (type === 'main') {
        titleName = 'Начинки'
    } else  {
        titleName += 'Соусы'
    }

    const addToCartIngredient = (item) => {
        if(item.type === 'bun' && cartState.bun.length === 0) {
            setCartState({
                bun: [item],
                ingredients: [...cartState.ingredients]
            })
        }

        if(item.type !== 'bun' && cartState.bun.length !== 0) {
            setCartState({
                ...cartState,
                ingredients: [...cartState.ingredients, item]
            })
        }
    }

    return (
        <div className={BurgerIngredientsStyles.ingredientsContainer}>
            <h2>{titleName}</h2>
            <div className={BurgerIngredientsStyles.ingredientsBlock}>
                {data.map((item) => {
                    if (item.type === type) {
                        return <RenderArticleIngredients item={item} key={item._id} clickAddToCart={addToCartIngredient}/>
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
