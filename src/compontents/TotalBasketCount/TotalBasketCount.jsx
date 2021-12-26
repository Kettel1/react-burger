import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useEffect, useMemo} from 'react';
import TotalBasketCountStyles from './TotalBasketCount.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {TOTAL_SUM_BUN, TOTAL_SUM_INGREDIENTS} from "../../services/actions/burgerCounstructor";
import {getOrderNumber} from "../../services/actions/order";
import {useLocation, useNavigate} from "react-router-dom";


// @ts-ignore
const TotalBasketCount = () => {
    const navigate = useNavigate()

    const location = useLocation()

    const authState = useSelector((state => state.auth))
    const dispatch = useDispatch()
    const cartState = useSelector((state => state.cart))
    const orderState = useSelector((state => state.order))
    const totalSumIngredient = useMemo(() => cartState.cartIngredients.reduce((prev, next) => prev + next.price, 0), [cartState.cartIngredients])

    useEffect(() => {
        if (cartState.cartBun.length !== 0 && cartState.cartIngredients.length === 0) {
            dispatch(
                {type: TOTAL_SUM_BUN, payload: cartState.cartBun.price}
            )
        }
        if (cartState.cartIngredients.length !== 0 || cartState.cartIngredients.length === 0) {
            dispatch({type: TOTAL_SUM_INGREDIENTS, payload: totalSumIngredient})
        }
    }, [cartState.cartBun, cartState.cartIngredients, dispatch])

    useEffect(() => {

    }, [orderState.orderSuccess])

    const getAllIdIngredientsInCart = cartState.cartIngredients.map((item) => {
        return item._id
    })

    const getAllIdBunInCart = cartState.cartBun._id

    const checkOrderRequest = () => {
        if (cartState.cartBun.length !== 0 && cartState.cartIngredients.length !== 0) {
            if (authState.isAuth) {
                dispatch(getOrderNumber([getAllIdBunInCart, ...getAllIdIngredientsInCart]))
            } else {
                navigate('/order/error', {state: {backgroundLocation: location}})
            }
        } else {
            console.log('test')
            navigate('/order/error', {state: {backgroundLocation: location}})

        }

    }

    useEffect(() => {
        if (orderState.orderSuccess) {
            navigate(`/order/${orderState.order.number}`, {state: {backgroundLocation: location}})
        }
    }, [orderState.orderSuccess])

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
