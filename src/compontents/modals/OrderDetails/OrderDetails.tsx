import React from 'react';
import OrderDetailsStyles from "./OrderDetail.module.scss";
import done from '../../../images/done.gif'
import {Link} from 'react-router-dom';
import {useSelector} from "../../../services/hooks";



const OrderDetails = () => {
        const orderState = useSelector(state => state.order)
        const cartState = useSelector(state => state.cart)
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
                {orderState.orderSuccess && cartState.cartBun.hasOwnProperty('name') && cartState.cartIngredients.length !== 0
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
                            {cartState.cartIngredients.length === 0 && !cartState.cartBun.hasOwnProperty('name') && 'Выберете булочку, а затем ингредиенты :)'}
                            {cartState.cartIngredients.length === 0 && 'А теперь ингредиенты :)'}
                        </p>
                    </section>
                }
            </>
        )
    }
;

export default OrderDetails;
