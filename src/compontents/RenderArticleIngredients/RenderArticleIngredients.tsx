import React from 'react';
import ingredientsTypes from '../../utils/types'
import PropTypes from "prop-types";
import ArticleIngredients from './RenderArticleIngredients.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

// @ts-ignore
const RenderArticleIngredients = ({ item }) => {
    return (
        <article className={ArticleIngredients.ingredientsBlockInner}>
            <img src={item.image} alt={item.name}/>
            <div className={ArticleIngredients.priceBlock}>
                <span className={ArticleIngredients.priceValue}>{item.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={ArticleIngredients.name}>{item.name}</p>
        </article>
    )
}

RenderArticleIngredients.propTypes = {
    item: PropTypes.shape({
        ingredientsTypes
    }).isRequired
}

export default RenderArticleIngredients;
