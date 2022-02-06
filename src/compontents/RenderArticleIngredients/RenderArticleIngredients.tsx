import React from 'react';
import ArticleIngredients from './RenderArticleIngredients.module.scss';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { IIngredient } from '../../types/ingredientTypes';
import { useSelector } from '../../services/hooks';

interface IRenderArticleIngredientsProps {
    item: IIngredient;
}

const RenderArticleIngredients = React.memo<IRenderArticleIngredientsProps>(({ item }) => {
    const location = useLocation();

    const cartState = useSelector((state) => state.cart);
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: item,
    });

    const counterIngredients = cartState.cartIngredients.filter((ing: IIngredient) => ing._id === item._id).length;

    const counterBun = (item: IIngredient) => {
        return cartState.cartBun._id === item._id ? 1 : 0;
    };

    return (
        <>
            <Link
                to={`/ingredients/${item._id}`}
                state={{ backgroundLocation: location }}
                ref={dragRef}
                className={ArticleIngredients.ingredientLink}
            >
                {counterIngredients !== 0 && <Counter count={counterIngredients} size="default" />}
                {counterBun(item) !== 0 && <Counter count={counterBun(item)} size="default" />}

                <img src={item.image} alt={item.name} />
                <div className={ArticleIngredients.priceBlock}>
                    <span className={ArticleIngredients.priceValue}>{item.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={ArticleIngredients.name}>{item.name}</p>
            </Link>
        </>
    );
});

export default RenderArticleIngredients;
