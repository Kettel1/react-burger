import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useEffect, useMemo} from 'react';
import TotalBasketCountStyles from './TotalBasketCount.module.scss'
import {getOrderNumber} from "../../services/actions/order";
import {useLocation, useNavigate} from "react-router-dom";
import {
    totalSumBunsInCart,
    totalSumIngredientsInCart,
} from "../../services/actions/burgerCounstructor";
import {useDispatch, useSelector} from "../../services/hooks";
import {IIngredient} from "../../types/ingredientTypes";

const TotalBasketCount = () => {
    const navigate = useNavigate()

    const location = useLocation()

    const authState = useSelector(state => state.auth)
    const cartState = useSelector(state => state.cart)
    const orderState = useSelector(state => state.order)

    const dispatch = useDispatch()

    const totalSumIngredient = useMemo(() =>
            cartState.cartIngredients.reduce((prev: number, next: IIngredient) => prev + next.price, 0)
        , [cartState.cartIngredients]
    )

    useEffect(() => {
        if (orderState.orderSuccess) {
            navigate(`/order/${orderState.order.number}`, {state: {backgroundLocation: location}})
        }
        // eslint-disable-next-line
    }, [orderState.orderSuccess])

    useEffect(() => {
        if (cartState.cartIngredients.length !== 0 || cartState.cartIngredients.length === 0) {
            dispatch(totalSumBunsInCart(cartState.cartBun.price));
            dispatch(totalSumIngredientsInCart(totalSumIngredient))
        }
    }, [cartState.cartBun, cartState.cartIngredients, dispatch, totalSumIngredient])

    useEffect(() => {

    }, [orderState.orderSuccess])

    const getAllIdIngredientsInCart = cartState.cartIngredients.map((item: IIngredient) => {
        return item._id
    })

    const getAllIdBunInCart = cartState.cartBun._id

    const checkOrderRequest = () => {
        if (cartState.cartBun.hasOwnProperty('name') && cartState.cartIngredients.length !== 0) {
            if (authState.isAuth) {
                dispatch(getOrderNumber([getAllIdBunInCart, ...getAllIdIngredientsInCart]))
            } else {
                navigate('/order/error', {state: {backgroundLocation: location}})
            }
        } else {
            navigate('/order/error', {state: {backgroundLocation: location}})
        }

    }

    const {totalSumIngredients, totalSumBun} = cartState

    return (
        <div className={TotalBasketCountStyles.container}>
            <div className={TotalBasketCountStyles.priceBlock}>
                <span className={TotalBasketCountStyles.priceValue}>{totalSumIngredients + totalSumBun}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <Button type="primary" size="large" onClick={checkOrderRequest}>Оформить заказ</Button>
        </div>
    );
};

export default TotalBasketCount;
