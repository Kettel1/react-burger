import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { WsConnectionFeedClosed } from '../services/actions/feed';
import FeedCardOrder from '../compontents/FeedCardOrder/FeedCardOrder';
import { IWebsocketOrders } from '../types/feedTypes';
import UserOrdersStyles from './UserOrdersStyles.module.scss';

const UserOrders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.allFeed);

    useEffect(() => {
        dispatch({ type: 'WS_CONNECTION_FEED_USER_START' });

        return () => {
            dispatch(WsConnectionFeedClosed());
        };
    }, [dispatch]);

    if (!orders.length) {
        return <div>Загрузка заказов...</div>;
    }

    return (
        <div className={UserOrdersStyles.container}>
            {orders.length >= 1 ? (
                orders.map((item: IWebsocketOrders) => {
                    return (
                        <FeedCardOrder
                            key={item._id}
                            time={item.createdAt}
                            status={item.status}
                            name={item.name}
                            ingredients={item.ingredients}
                            orderNumber={item.number}
                            id={item._id}
                            pageName={'profile/orders'}
                        />
                    );
                })
            ) : (
                <div>Вы не сделали еще ни одного заказа</div>
            )}
        </div>
    );
};

export default UserOrders;
