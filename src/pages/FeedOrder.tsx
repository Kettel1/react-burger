import React, {useEffect} from 'react';
import FeedDetails from "../compontents/modals/FeedDetails/FeedDetails";
import {getOrdersFeed} from "../services/actions/feed";
import {useDispatch, useSelector} from "../services/hooks";

const FeedOrder = () => {
    //TODO Типизация
    const dispatch = useDispatch()

    const feedState = useSelector(state => state.allFeed.orders)

    useEffect(() => {
        dispatch(getOrdersFeed())
    }, [])

    if (!feedState.length) {
        return <div>Загрузка заказа...</div>
    }

    return (
        <div>
            <FeedDetails orders={feedState}/>
        </div>
    );
};

export default FeedOrder;
