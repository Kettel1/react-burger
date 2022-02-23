import React, { FC, useEffect } from 'react';
import FeedDetails from '../compontents/modals/FeedDetails/FeedDetails';
import { getOrdersFeed } from '../services/actions/feed';
import { useDispatch, useSelector } from '../services/hooks';
import FeedOrderStyles from './FeedOrder.module.scss'

const FeedOrder: FC = () => {
    const dispatch = useDispatch();

    const feedState = useSelector((state) => state.allFeed.orders);

    useEffect(() => {
        dispatch(getOrdersFeed());
    }, [dispatch]);

    if (!feedState.length) {
        return <div>Загрузка заказа...</div>;
    }

    return (
        <div className={FeedOrderStyles.container}>
            <FeedDetails orders={feedState} />
        </div>
    );
};

export default FeedOrder;
