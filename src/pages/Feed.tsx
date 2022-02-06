import React, { FC, useEffect } from 'react';
import FeedStyles from './Feed.module.scss';
import FeedCardOrder from '../compontents/FeedCardOrder/FeedCardOrder';
import { useDispatch, useSelector } from '../services/hooks';
import { WsConnectionFeedClosed, WsConnectionFeedStart } from '../services/actions/feed';
import { IWebsocketOrders } from '../types/feedTypes';

type TStatus = 'done' | 'pending' | 'created';

const Feed: FC = () => {
    const dispatch = useDispatch();

    const { totalToday, total, orders } = useSelector((state) => state.allFeed);

    useEffect(() => {
        dispatch(WsConnectionFeedStart());
        return () => {
            dispatch(WsConnectionFeedClosed());
        };
    }, []);

    const getOrdersNumbersByStatus = (orders: IWebsocketOrders[], orderStatus: TStatus): number[] => {
        const sortedOrders = orders.filter((item) => item.status === orderStatus);
        // По тз должно быть не больше 10 значений
        return sortedOrders.map((item) => item.number).slice(0, 10);
    };

    //TODO Сделать красивый прелодер
    if (!orders.length) {
        return <div>Загрузка</div>;
    }

    return (
        <section className={FeedStyles.container}>
            <div className={FeedStyles.ordersFeed}>
                <h1 className={FeedStyles.title}>Лента заказов</h1>
                <div className={FeedStyles.ordersFeedScroll}>
                    {orders.length &&
                        orders.map((item: IWebsocketOrders) => (
                            <FeedCardOrder
                                key={item._id}
                                id={item._id}
                                time={item.createdAt}
                                name={item.name}
                                orderNumber={item.number}
                                ingredients={item.ingredients}
                                pageName={'feed'}
                            />
                        ))}
                </div>
            </div>

            <div className={FeedStyles.ordersStatus}>
                <div className={FeedStyles.ordersStatusDone}>
                    <p className={FeedStyles.ordersStatusTitle}>Готовы:</p>
                    <ul className={FeedStyles.ordersStatusDoneList}>
                        {getOrdersNumbersByStatus(orders, 'done').length ? (
                            getOrdersNumbersByStatus(orders, 'done').map((item) => (
                                <li key={item} className={FeedStyles.orderStatusDoneItem}>
                                    {item}
                                </li>
                            ))
                        ) : (
                            <div>Здесь пусто...</div>
                        )}
                    </ul>
                </div>

                <div className={FeedStyles.ordersStatusDone}>
                    <p className={FeedStyles.ordersStatusTitle}>В работе:</p>
                    <ul className={FeedStyles.ordersStatusDoneList}>
                        {getOrdersNumbersByStatus(orders, 'pending').length >= 1 ? (
                            getOrdersNumbersByStatus(orders, 'pending').map((item) => (
                                <li key={item} className={FeedStyles.orderStatusDoneItem}>
                                    {item}
                                </li>
                            ))
                        ) : (
                            <div>Здесь пусто...</div>
                        )}
                    </ul>
                </div>

                <div className={FeedStyles.orderTotalContainer}>
                    <h3 className={FeedStyles.orderTotalTitle}>Выполнено за все время</h3>
                    <p className={FeedStyles.orderTotalQty}>{total}</p>
                </div>

                <div className={FeedStyles.orderTotalContainer}>
                    <h3 className={FeedStyles.orderTotalTitle}>Выполнено за сегодня</h3>
                    <p className={FeedStyles.orderTotalQty}>{totalToday}</p>
                </div>
            </div>
        </section>
    );
};

export default Feed;
