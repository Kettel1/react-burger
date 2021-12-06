import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import Modal from '../modals/Modal/Modal.jsx';
import TotalBasketCountStyles from './TotalBasketCount.module.scss'
import OrderDetails from "../modals/OrderDetails/OrderDetails";
import {CartContext} from "../../services/CartContext";
import {CreateOrderContext} from "../../services/CreateOrderContext";

import {useDispatch, useSelector} from "react-redux";
import {getOrderNumber} from "../../services/actions/BurgerCounstructor";

const startState = {
    totalSum: 0,
    totalBun: 0
}

const TOTAL_SUM_CART = 'TOTAL_SUM_CART'
const TOTAL_SUM_CART_BUN = 'TOTAL_SUM_CART_BUN'

const reducer = (state, action) => {

    switch (action.type) {
        case TOTAL_SUM_CART_BUN:
            return {totalBun: action.payload * 2, totalSum: state.totalSum}
        case TOTAL_SUM_CART:
            return {totalSum: action.payload, totalBun: state.totalBun}
        default:
            return state
    }
}


// @ts-ignore
const TotalBasketCount = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [cartState] = React.useContext(CartContext)
    const [totalPriceState, dispatchTotalPriceState] = React.useReducer(reducer, startState, undefined)

    const dispatch = useDispatch()

    const {order, orderSuccess, orderName} = useSelector(state => state.constructor)


    React.useEffect(() => {
        if (cartState.bun.length !== 0 && cartState.ingredients.length === 0) {
            dispatchTotalPriceState(
                {type: TOTAL_SUM_CART_BUN, payload: cartState.bun[0].price}
            )
        }
        if (cartState.ingredients.length !== 0) {
            const total = cartState.ingredients.reduce((prev, next) => prev + next.price, 0)
            dispatchTotalPriceState({type: TOTAL_SUM_CART, payload: total})
        }

    }, [cartState])

    const getIngredientsAllId = cartState.ingredients.map((item) => {
        return item._id
    })

    const getBunAllId = cartState.bun.map((item) => {
        return item._id
    })

    const {totalSum, totalBun} = totalPriceState

    const toggleModal = () => {
        dispatch(getOrderNumber([...getBunAllId, ...getIngredientsAllId]))
    }

    return (
        <div className={TotalBasketCountStyles.container}>
            <div className={TotalBasketCountStyles.priceBlock}>
                <span className={TotalBasketCountStyles.priceValue}>{totalSum + totalBun}</span>
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
