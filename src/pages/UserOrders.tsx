import React, {useEffect} from 'react';
import {useDispatch} from "../services/hooks";
import {WsConnectionFeedClosed} from "../services/actions/feed";

const UserOrders = () => {

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch({type: 'WS_CONNECTION_FEED_USER_START'})

        return () => {
            dispatch(WsConnectionFeedClosed())
        }
    }, [])

    return (
        <div>
            UserOrders
        </div>
    );
};

export default UserOrders;
