import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import Modal from '../modals/Modal/Modal.jsx';
import TotalBasketCountStyles from './TotalBasketCount.module.scss'
import OrderDetails from "../modals/OrderDetails/OrderDetails";
import {CartContext} from "../../services/CartContext";
import {CreateOrderContext} from "../../services/CreateOrderContext";

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
    const {getOrderNumber, setOrderState} = React.useContext(CreateOrderContext)
    const [totalPriceState, dispatchTotalPriceState] = React.useReducer(reducer, startState, undefined)
    const {orderState} = React.useContext(CreateOrderContext)

    React.useEffect(() => {
        if (cartState.bun.length !== 0 && cartState.ingredients.length === 0) {
            dispatchTotalPriceState(
                {type: TOTAL_SUM_CART_BUN, payload: cartState.bun[0].price}
            )
        }
        if (cartState.ingredients.length !== 0) {
            const total = cartState.ingredients.reduce((prev, next) => prev + next.price, 0)
            // console.log(total)
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
        getOrderNumber([...getBunAllId, ...getIngredientsAllId]).then(orderInfo => {
            setOrderState({...orderInfo})
            setIsOpen(true)
        })
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
