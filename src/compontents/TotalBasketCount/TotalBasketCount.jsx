import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import Modal from '../modals/Modal/Modal.jsx';
import TotalBasketCountStyles from './TotalBasketCount.module.scss'
import OrderDetails from "../modals/OrderDetails/OrderDetails";

import {useDispatch, useSelector} from "react-redux";
import {getOrderNumber, TOTAL_SUM_BUN, TOTAL_SUM_INGREDIENTS} from "../../services/actions/BurgerCounstructor";


// @ts-ignore
const TotalBasketCount = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    const dispatch = useDispatch()
    const cartState = useSelector(state => state.cart)

    React.useEffect(() => {
        if (cartState.cartBun.length !== 0 && cartState.cartIngredients.length === 0) {
            dispatch(
                {type: TOTAL_SUM_BUN, payload: cartState.cartBun.price}
            )
        }
        if (cartState.cartIngredients.length !== 0) {
            const total = cartState.cartIngredients.reduce((prev, next) => prev + next.price, 0)
            dispatch({type: TOTAL_SUM_INGREDIENTS, payload: total})
        }
    }, [cartState.cartBun, cartState.cartIngredients])

    React.useEffect(() => {
        if(cartState.orderSuccess) {
            setIsOpen(true)
        }
    }, [cartState.orderSuccess])

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

    const {totalSumIngredients, totalSumBun} = cartState

    return (
        <div className={TotalBasketCountStyles.container}>
            <div className={TotalBasketCountStyles.priceBlock}>
                <span className={TotalBasketCountStyles.priceValue}>{totalSumIngredients + totalSumBun}</span>
                <CurrencyIcon  type="primary"/>
            </div>
            <Button type="primary" size="large"
                    onClick={toggleModal}>Оформить заказ</Button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <OrderDetails/>
            </Modal>

        </div>
    );
};

export default TotalBasketCount;
