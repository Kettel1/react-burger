import React from 'react';
import OrderDetailsStyles from './OrderDetail.module.scss';
import done from '../../../images/done.gif';
import { Link } from 'react-router-dom';
import { useSelector } from '../../../services/hooks';

const OrderDetails = () => {
    const { orderSuccess, orderResponse } = useSelector((state) => state.order);
    const cartState = useSelector((state) => state.cart);
    const { isAuth } = useSelector((state) => state.auth);

    if (!isAuth) {
        return (
            <section className={OrderDetailsStyles.errorContainer}>
                <p className={OrderDetailsStyles.errorAuthTitle}>
                    Для оформления заказа, необходимо авторизоваться на сайте
                </p>
                <Link className={OrderDetailsStyles.errorAuthLink} to="/login">
                    Войти на сайт
                </Link>
            </section>
        );
    }

    return (
        <>
            {orderSuccess ? (
                <section className={OrderDetailsStyles.container}>
                    <h1 className={OrderDetailsStyles.id}>{orderResponse.number}</h1>
                    <p className={OrderDetailsStyles.text}>идентификатор заказа</p>
                    <img className={OrderDetailsStyles.image} src={done} alt={'Готово'} />
                    <p className={OrderDetailsStyles.orderMessagePrimary}>Ваш Заказ начали готовить</p>
                    <p className={OrderDetailsStyles.orderMessageSecondary}>
                        Дождитесь готовности на орбитальной станции
                    </p>
                </section>
            ) : (
                <section className={OrderDetailsStyles.errorContainer}>
                    <h1 className={OrderDetailsStyles.errorTitle}>Ошибка</h1>
                    <p className={OrderDetailsStyles.errorText}>

                        {/*Проверка на отсутствие ингредиентов и булочки*/}
                        {cartState.cartIngredients.length === 0 &&
                        !cartState.cartBun.hasOwnProperty('name') &&
                        'Выберете булочку, а затем ингредиенты'}

                        {/*Проверка на отсутсвтие ингредиентов и наличие булочки*/}
                        {cartState.cartIngredients.length === 0 &&
                        cartState.cartBun.hasOwnProperty('name') &&
                        'Нужно добавить ингредиенты'}
                    </p>
                </section>
            )}
        </>
    );
};
export default OrderDetails;
