import React from 'react';
// @ts-ignore
import BurgerIngredientsStyles from "./RenderBurgerIngredients.module.scss";
import ingredientsTypes from '../../utils/types'
import PropTypes from "prop-types";
import RenderArticleIngredients from '../RenderArticleIngredients/RenderArticleIngredients';
import {CartContext} from "../../services/CartContext";
import {useDispatch, useSelector} from "react-redux";
import {ADD_BUN_TO_CART, ADD_INGREDIENTS_TO_CART} from "../../services/actions/BurgerCounstructor";




// @ts-ignore
const RenderBurgerIngredients = ({ type }) => {
    const [cartState, setCartState] = React.useContext(CartContext)
    const {ingredients} = useSelector(state => state.ingredients)
    const dispatch = useDispatch();
    const constr = useSelector(state => state.constructor)
    const ingredient = useSelector(state => state.ingredients)
    console.log(ingredient)
    console.log(constr)

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
            dispatch({
                type: ADD_BUN_TO_CART,
                bun: item
            })

            setCartState({
                bun: [item],
                ingredients: [...cartState.ingredients]
            })
        }

        if(item.type !== 'bun' && cartState.bun.length !== 0) {
            console.log(item)
            dispatch({
                type: ADD_INGREDIENTS_TO_CART,
                ingredients: item
            })

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
                {ingredients.map((item) => {
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
