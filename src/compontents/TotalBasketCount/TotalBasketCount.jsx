import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import Modal from '../modals/Modal/Modal.jsx';
import TotalBasketCountStyles from './TotalBasketCount.module.scss'
import OrderDetails from "../modals/OrderDetails/OrderDetails";
import {CartContext} from "../../services/CartContext";
import {TotalPriceContext} from "../../services/TotalPriceContext";
import {CreateOrderContext} from "../../services/CreateOrderContext";

// @ts-ignore
const TotalBasketCount = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [cartState] = React.useContext(CartContext)
    const [totalPriceState] = React.useContext(TotalPriceContext)
    const {getOrderNumber, setOrderState} = React.useContext(CreateOrderContext)

    const getIngredientsAllId = cartState.ingredients.map((item) => {
        return item._id
    })

    const getBunAllId = cartState.bun.map((item) => {
        return item._id
    })

    const {totalSum, totalBun} = totalPriceState

    const toggleModal = () => {
        setIsOpen(true)
    }

    return (
        <div className={TotalBasketCountStyles.container}>
            <div className={TotalBasketCountStyles.priceBlock}>
                <span className={TotalBasketCountStyles.priceValue}>{totalSum + totalBun}</span>
                <CurrencyIcon  type="primary"/>
            </div>
            <Button type="primary" size="large"
                    onClick={() => {
                        toggleModal();
                        getOrderNumber([...getBunAllId, ...getIngredientsAllId]).then(orderInfo => {
                            setOrderState({...orderInfo})
                        })}}>Оформить заказ</Button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <OrderDetails/>
            </Modal>

        </div>
    );
};

export default TotalBasketCount;
