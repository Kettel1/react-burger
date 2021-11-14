import React from 'react';
import OrderDetailsStyles from "./OrderDetail.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import done from '../../../images/done.png'

// @ts-ignore
const OrderDetails = ({onClose}) => {
    return (
        <>
            <h1 className={OrderDetailsStyles.id}>034536</h1>
            <p className={OrderDetailsStyles.text}>идентификатор заказа</p>
            <button className={OrderDetailsStyles.closeButton} onClick={onClose}><CloseIcon type="primary"/></button>
            <img className={OrderDetailsStyles.image} src={done} alt={'Готово'}/>
            <p className={OrderDetailsStyles.orderMessagePrimary}>Ваш Заказ начали готовить</p>
            <p className={OrderDetailsStyles.orderMessageSecondary}>Дождитесь готовности на орбитальной станции</p>
        </>
    );
};

export default OrderDetails;
