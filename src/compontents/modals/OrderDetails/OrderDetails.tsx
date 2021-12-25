import React from 'react';
import OrderDetailsStyles from "./OrderDetail.module.scss";
import done from '../../../images/done.gif'
import {useSelector} from "react-redux";
import {Link, useParams} from 'react-router-dom';


const OrderDetails = () => {
        const params = useParams()

        console.log(params)

        // @ts-ignore
        const orderState = useSelector((state => state.order))

        // @ts-ignore
        const cartState = useSelector(state => state.cart)

        // @ts-ignore
        const {isAuth} = useSelector(state => state.auth);


        if (!isAuth) {
            return (<section className={OrderDetailsStyles.errorContainer}>
                <p  className={OrderDetailsStyles.errorAuthTitle}>Для оформления заказа,
                    необходимо авторизоваться на сайте
                </p>
                <Link className={OrderDetailsStyles.errorAuthLink} to='/login'>Войти на сайт</Link>
            </section>)
        }


        return (
            <>
                {orderState.orderSuccess && cartState.cartBun.length !== 0 && cartState.cartIngredients.length !== 0
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
                            {cartState.cartIngredients.length === 0 && cartState.cartBun.length === 0 && 'Выберете булочку, а затем ингредиенты :)'}
                            {cartState.cartIngredients.length === 0 && cartState.cartBun.name && 'А теперь ингредиенты :)'}
                        </p>
                    </section>
                }
            </>
        )
    }
;

export default OrderDetails;
