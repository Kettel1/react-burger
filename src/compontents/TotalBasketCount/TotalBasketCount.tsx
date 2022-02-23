import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useMemo } from 'react';
import TotalBasketCountStyles from './TotalBasketCount.module.scss';
import { getOrderNumber } from '../../services/actions/order';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    setInitialCartState,
    totalSumIngredientsInCart
} from '../../services/actions/burgerCounstructor';
import { useDispatch, useSelector } from '../../services/hooks';
import { getTotalSumIngredients, getAllIdIngredientsInCart } from '../../services/selectors/ingredientsSelectors';
import trashCanIcon from '../../images/trash.svg'


const TotalBasketCount = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const { isAuth } = useSelector((state) => state.auth);
    const { totalSumIngredients, totalSumBun, cartIngredients, cartBun } = useSelector((state) => state.cart);
    const { orderResponse, orderSuccess, orderRequest } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    const memoTotalSumIngredient = useMemo(() => getTotalSumIngredients(cartIngredients), [cartIngredients]);

    useEffect(() => {
        if (orderSuccess) {
            navigate(`/order/${orderResponse.number}`, { state: { backgroundLocation: location } });
        }
        // eslint-disable-next-line
    }, [orderSuccess]);

    useEffect(() => {
        if (cartIngredients.length !== 0 || cartIngredients.length === 0) {
            dispatch(totalSumIngredientsInCart(memoTotalSumIngredient));
        }
    }, [cartBun, dispatch, memoTotalSumIngredient, ]);

    const getOrderRequest = () => {
        if (cartBun.hasOwnProperty('name') && cartIngredients.length !== 0 && isAuth) {
            const getIdBunInCart = cartBun._id;
            dispatch(getOrderNumber([getIdBunInCart, ...getAllIdIngredientsInCart(cartIngredients)]));
        } else {
            navigate('/order/error', { state: { backgroundLocation: location } });
        }
    };

    const setClearCart = () => {
        dispatch(setInitialCartState())
    }

    return (
        <div className={TotalBasketCountStyles.container}>
             <button onClick={setClearCart} className={TotalBasketCountStyles.clearCart}>
                 <span className={TotalBasketCountStyles.clearCartTooltip}>Очистить корзину</span>
                 <img src={trashCanIcon} height='20' width='20'/>
             </button>

            <div className={TotalBasketCountStyles.priceBlock}>
                <span className={TotalBasketCountStyles.priceValue}>{totalSumIngredients + totalSumBun}</span>
                <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" disabled={orderRequest} onClick={getOrderRequest}>
                {orderRequest ? 'Заказ оформляется...' : 'Оформить заказ'}
            </Button>
        </div>
    );
};

export default TotalBasketCount;
