import React, { FC, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../services/hooks';
import {
    getAmountByIngredientsId,
    getOrdersById,
    getArrayIngredientsById,
} from '../../../services/selectors/ingredientsSelectors';

import FeedDetailsStyles from './FeedDetails.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getTimeFromTimestamp } from '../../../services/helpers';
import { IIngredient } from '../../../types/ingredientTypes';
import { IWebsocketOrders } from '../../../types/feedTypes';

const FeedIngredientsItem: FC<{
    item: IIngredient;
    orders: IWebsocketOrders[];
    orderId: string;
}> = ({ item, orders, orderId }) => {
    const getOrderById = (orders: IWebsocketOrders[], id: string): IWebsocketOrders => {
        return orders.filter((item: IWebsocketOrders) => item._id === id)[0];
    };

    const getCountIngredientsInOrder = (orders: IWebsocketOrders[], ingredientId: string, orderId: string): number => {
        const order = getOrderById(orders, orderId);
        return order.ingredients.filter((item: string) => item === ingredientId).length;
    };

    return (
        <li className={FeedDetailsStyles.ingredientsItem} key={item._id}>
            <div className={FeedDetailsStyles.ingredientsImageContainer}>
                <img src={item.image_mobile} alt={item.name} />
            </div>
            <p className={FeedDetailsStyles.ingredientsName}>{item.name}</p>
            <div className={FeedDetailsStyles.ingredientsPriceContainer}>
                <p>
                    {getCountIngredientsInOrder(orders, item._id, orderId)} x {item.price}
                </p>
                <CurrencyIcon type={'primary'} />
            </div>
        </li>
    );
};

const FeedDetails: FC<{ orders?: IWebsocketOrders[] }> = ({ orders }) => {
    const { state, pathname } = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        // Проверка если пользователь по прямой ссылке
        const getPathFromUserCome = pathname.split('/')[1]
        if (state === null && getPathFromUserCome === 'profile') {
            dispatch({ type: 'WS_CONNECTION_FEED_USER_START' });
        }
    }, [state, dispatch]);

    const { id } = useParams();

    const feedState = useSelector((state) => state.allFeed.orders);

    const ingredientsState = useSelector((state) => state);

    let allOrders: IWebsocketOrders[];

    let currentOrder: IWebsocketOrders | undefined;

    // Проверка откуда юзер пришел
    if (orders) {
        // Из внешнего ресурса
        currentOrder = getOrdersById(orders, id);
        allOrders = orders;
    } else {
        // Из приложения
        currentOrder = getOrdersById(feedState, id);
        allOrders = feedState;
    }

    if (!currentOrder?._id) {
        return <div>Загрузка...</div>;
    }

    const { number, name, status, ingredients, createdAt, _id } = currentOrder;

    const priceAllIngredientsInOrders = getAmountByIngredientsId(ingredientsState, ingredients);
    // Получаем уникальные не повторяющиеся ингредиенты
    const arrayIngredientsInOrder = Array.from(new Set([...getArrayIngredientsById(ingredientsState, ingredients)]));

    return (
        <section className={FeedDetailsStyles.container}>
            <div className={FeedDetailsStyles.innerContainer}>
                <div className={FeedDetailsStyles.header}>
                    <p className={FeedDetailsStyles.id}>{'#' + number}</p>

                    <p className={FeedDetailsStyles.name}>{name}</p>

                    <p className={FeedDetailsStyles.status}>{status === 'done' ? 'Выполнен' : 'В процессе'}</p>

                    <p className={FeedDetailsStyles.composition}>Состав:</p>
                </div>

                <ul className={FeedDetailsStyles.ingredientsList}>
                    {arrayIngredientsInOrder.map((item: IIngredient) => (
                        <FeedIngredientsItem key={item._id} item={item} orders={allOrders} orderId={_id} />
                    ))}
                </ul>

                <div className={FeedDetailsStyles.footer}>
                    <time className={FeedDetailsStyles.time} dateTime={createdAt}>
                        {getTimeFromTimestamp(createdAt && createdAt)}
                    </time>
                    <div className={FeedDetailsStyles.priceContainer}>
                        <p>{priceAllIngredientsInOrders}</p>
                        <CurrencyIcon type={'primary'} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeedDetails;
