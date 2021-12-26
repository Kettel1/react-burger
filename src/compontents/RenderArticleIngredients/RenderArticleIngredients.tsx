import React from 'react';
import ArticleIngredients from './RenderArticleIngredients.module.scss'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";

// @ts-ignore
const RenderArticleIngredients = React.memo(({item}) => {
    let location = useLocation();
    // @ts-ignore
    const cartState = useSelector((state => state.cart))
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: item,
    })

    // @ts-ignore
    const counterIngredients = cartState.cartIngredients.filter((ing) => ing._id === item._id).length

    // @ts-ignore
    const counterBun = (item) => {
        return cartState.cartBun._id === item._id ? 1 : 0
     }


    return<>
        <Link
            to={`/ingredients/${item._id}`}
            state={{backgroundLocation: location}}
            ref={dragRef}
            className={ArticleIngredients.ingredientLink}
        >
            {counterIngredients !== 0 && <Counter count={counterIngredients} size='default'/>}
            {counterBun(item) !== 0 && <Counter count={counterBun(item)} size='default'/>}


            <img src={item.image} alt={item.name}/>
            <div className={ArticleIngredients.priceBlock}>
                <span className={ArticleIngredients.priceValue}>{item.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={ArticleIngredients.name}>{item.name}</p>
        </Link>
    </>
})

export default RenderArticleIngredients;
