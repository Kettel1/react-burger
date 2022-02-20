import {
    IFeedState,
    IWsConnectionFeedClosed, IWsConnectionFeedError,
    IWsConnectionFeedStart,
    IWsConnectionFeedSuccess,
    IWsGetFeedOrders
} from '../../types/feedTypes';
import { AppDispatch, AppThunk } from '../../types';
import { API_REACT } from '../url';

export const WS_CONNECTION_FEED_START = 'WS_CONNECTION_FEED_START';
export const WS_CONNECTION_FEED_SUCCESS = 'WS_CONNECTION_FEED_SUCCESS';
export const WS_CONNECTION_FEED_ERROR = 'WS_CONNECTION_FEED_ERROR';
export const WS_CONNECTION_FEED_CLOSED = 'WS_CONNECTION_FEED_CLOSED';
export const WS_GET_FEED_ORDERS = 'WS_GET_FEED_ORDERS';

export const WS_CONNECTION_FEED_USER_START = 'WS_CONNECTION_FEED_USER_START';
export const WS_CONNECTION_FEED_USER_SUCCESS = 'WS_CONNECTION_FEED_USER_SUCCESS';
export const WS_CONNECTION_FEED_USER_ERROR = 'WS_CONNECTION_FEED_USER_ERROR';
export const WS_CONNECTION_FEED_USER_CLOSED = 'WS_CONNECTION_FEED_USER_CLOSED';
export const WS_GET_FEED_USER_ORDERS = 'WS_GET_FEED_USER_ORDERS';

export const GET_ALL_ORDERS = 'GET_ALL_ORDERS';

export const getOrdersFeed: AppThunk = () => (dispatch: AppDispatch) => {
    return fetch(API_REACT + '/orders/all')
        .then((response) => {
            if (!response.ok) {
                console.log('Произошла ошибка');
            }
            return response.json();
        })
        .then((orders) => {
            dispatch({ type: GET_ALL_ORDERS, payload: orders.orders });
        })
        .catch((e) => {
            console.log(e);
        });
};

export const WsConnectionFeedStart = (): IWsConnectionFeedStart => ({
    type: WS_CONNECTION_FEED_START,
});

export const WsConnectionFeedSuccess = (): IWsConnectionFeedSuccess => ({
    type: WS_CONNECTION_FEED_SUCCESS,
});

export const WsConnectionFeedError = (): IWsConnectionFeedError => ({
    type: WS_CONNECTION_FEED_ERROR,
});

export const WsConnectionFeedClosed = (): IWsConnectionFeedClosed => ({
    type: WS_CONNECTION_FEED_CLOSED,
});

export const WsGetFeedOrders = (parsedData: Omit<IFeedState, 'wsConnected'>): IWsGetFeedOrders => ({
    type: WS_GET_FEED_ORDERS,
    payload: parsedData,
});
