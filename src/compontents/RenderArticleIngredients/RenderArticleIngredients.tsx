import React from 'react';
import ingredientsTypes from '../../utils/types'
import PropTypes from "prop-types";
import ArticleIngredients from './RenderArticleIngredients.module.scss'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../modals/Modal/Modal';
import IngredientDetails from "../modals/IngredientsDetails/IngredientDetails";
import {useDispatch, useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {REMOVE_VIEWED_INGREDIENT, SET_VIEWED_INGREDIENT } from '../../services/actions/viewedIngredient';

// @ts-ignore
const RenderArticleIngredients = ({item}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const dispatch = useDispatch()
    // @ts-ignore
    const cartState = useSelector((state) => state.cart)
    // @ts-ignore
    const viewedIngredientState = useSelector((state) => state.viewedIngredient)

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: item,
    })

    const toggleModal = () => {
        dispatch({type: SET_VIEWED_INGREDIENT, ingredient: item})
        setIsOpen(!isOpen)
    }

    const closeModal = () => {
        dispatch({type: REMOVE_VIEWED_INGREDIENT})
        setIsOpen(false)
    }

    // @ts-ignore
    const counterIngredients = cartState.cartIngredients.filter((ing) => ing._id === item._id).length

    // @ts-ignore
    return <>
        <article
            ref={dragRef}
            onClick={toggleModal}
            className={ArticleIngredients.ingredientsBlockInner}
        >
            {counterIngredients !== 0 && <Counter count={counterIngredients} size='default'/>}

            <img src={item.image} alt={item.name}/>
            <div className={ArticleIngredients.priceBlock}>
                <span className={ArticleIngredients.priceValue}>{item.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={ArticleIngredients.name}>{item.name}</p>
        </article>
        {isOpen &&(
            <Modal onClose={closeModal}>
                <IngredientDetails/>
            </Modal>
        )}
    </>
}

RenderArticleIngredients.propTypes = {
    item: ingredientsTypes.isRequired,
}

export default RenderArticleIngredients;
