import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import Modal from '../modals/Modal/Modal.jsx';
import TotalBasketCountStyles from './TotalBasketCount.module.css'
import OrderDetails from "../modals/OrderDetails/OrderDetails";

// @ts-ignore
const TotalBasketCount = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleModal = () => {
        setIsOpen(true)
    }

    return (
        <div className={TotalBasketCountStyles.container}>
            <div className={TotalBasketCountStyles.priceBlock}>
                <span className={TotalBasketCountStyles.priceValue}>600</span>
                <CurrencyIcon  type="primary"/>
            </div>
            <Button type="primary" size="large" onClick={toggleModal}>Оформить заказ</Button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <OrderDetails/>
            </Modal>

        </div>
    );
};

export default TotalBasketCount;
