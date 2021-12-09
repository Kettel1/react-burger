import React from 'react';
import ingredientsTypes from '../../utils/types'
import PropTypes from "prop-types";
import ArticleIngredients from './RenderArticleIngredients.module.scss'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../modals/Modal/Modal';
import IngredientDetails from "../modals/IngredientsDetails/IngredientDetails";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";

// @ts-ignore
const RenderArticleIngredients = ({item}) => {
    const [isOpen, setIsOpen] = React.useState(false)
    // @ts-ignore
    const cartState = useSelector((state) => state.cart)

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: item,
    })

    const toggleModal = () => {
        setIsOpen(!isOpen)
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
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <IngredientDetails ingredientsInfo={item}/>
        </Modal>
    </>
}

RenderArticleIngredients.propTypes = {
    item: PropTypes.shape({
        ingredientsTypes
    }).isRequired
}

export default RenderArticleIngredients;
