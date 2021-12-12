import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import Modal from '../modals/Modal/Modal.jsx';
import TotalBasketCountStyles from './TotalBasketCount.module.scss'
import OrderDetails from "../modals/OrderDetails/OrderDetails";

import {useDispatch, useSelector} from "react-redux";
import {TOTAL_SUM_BUN, TOTAL_SUM_INGREDIENTS} from "../../services/actions/burgerCounstructor";
import {getOrderNumber} from "../../services/actions/order";
import {REMOVE_VIEWED_INGREDIENT} from "../../services/actions/viewedIngredient";



// @ts-ignore
const TotalBasketCount = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    const dispatch = useDispatch()
    const cartState = useSelector(state => state.cart)
    const orderState = useSelector(state => state.order)
    const totalSumIngredient = React.useMemo(() => cartState.cartIngredients.reduce((prev, next) => prev + next.price, 0), [cartState.cartIngredients])

    React.useEffect(() => {
        if (cartState.cartBun.length !== 0 && cartState.cartIngredients.length === 0) {
            dispatch(
                {type: TOTAL_SUM_BUN, payload: cartState.cartBun.price}
            )
        }
        if (cartState.cartIngredients.length !== 0) {
            dispatch({type: TOTAL_SUM_INGREDIENTS, payload: totalSumIngredient})
        }
    }, [cartState.cartBun, cartState.cartIngredients, dispatch])

    React.useEffect(() => {
        setIsOpen(!!orderState.orderSuccess)
    }, [orderState.orderSuccess])

    const getIngredientsAllId = cartState.cartIngredients.map((item) => {
        return item._id
    })

    const getBunAllId = cartState.cartBun._id

    const toggleModal = () => {
        if(cartState.cartBun.length !== 0 && cartState.cartIngredients.length !== 0) {
            dispatch(getOrderNumber([getBunAllId, ...getIngredientsAllId]))
        } else {
            setIsOpen(true)
        }
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const {totalSumIngredients, totalSumBun} = cartState

    return (
        <div className={TotalBasketCountStyles.container}>
            <div className={TotalBasketCountStyles.priceBlock}>
                <span className={TotalBasketCountStyles.priceValue}>{totalSumIngredients + totalSumBun}</span>
                <CurrencyIcon  type="primary"/>
            </div>
            <Button type="primary" size="large"
                    onClick={toggleModal}>Оформить заказ</Button>
            {isOpen && (
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
        </div>
    );
};

export default TotalBasketCount;
