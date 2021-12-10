import React from 'react';
import OrderDetailsStyles from "./OrderDetail.module.scss";
import done from '../../../images/done.png'
import {useSelector} from "react-redux";


const OrderDetails = () => {
    // @ts-ignore
    const orderState = useSelector(state => state.order)

    return (
        <>
            {orderState.orderSuccess
                ?
                <section className={OrderDetailsStyles.container}>
                    <h1 className={OrderDetailsStyles.id}>{orderState.order.number}</h1>
                    <p className={OrderDetailsStyles.text}>идентификатор заказа</p>
                    <img className={OrderDetailsStyles.image} src={done} alt={'Готово'}/>
                    <p className={OrderDetailsStyles.orderMessagePrimary}>Ваш Заказ начали готовить</p>
                    <p className={OrderDetailsStyles.orderMessageSecondary}>Дождитесь готовности на орбитальной
                        станции</p>
                </section>
                :
                <section className={OrderDetailsStyles.errorContainer}>
                    <h1 className={OrderDetailsStyles.errorTitle}>Возникла предвиденная ошибка</h1>
                    <p className={OrderDetailsStyles.errorText}>
                        {orderState.cartIngredients.length === 0 && orderState.cartBun.length === 0 && 'Выберете булочку, а затем ингредиенты :)'}
                        {orderState.cartIngredients.length === 0 && orderState.cartBun.name && 'А теперь ингредиенты :)'}
                    </p>
                </section>
            }
        </>
    );
};

export default OrderDetails;
