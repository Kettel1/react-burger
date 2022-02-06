import {
    GET_ORDER_BY_ID,
    WS_CONNECTION_FEED_CLOSED,
    WS_CONNECTION_FEED_ERROR,
    WS_CONNECTION_FEED_START,
    WS_CONNECTION_FEED_SUCCESS,
    WS_CONNECTION_FEED_USER_START,
    WS_GET_FEED_ORDERS,
} from '../services/actions/feed';

export interface IWebsocketOrders {
    _id: string;
    ingredients: string[];
    status: 'done' | 'pending' | 'created';
    name: 'string';
    number: number;
    createdAt?: string;
    updateAt?: string;
}

export interface IFeedState {
    wsConnected: boolean;
    success: boolean;
    total: number;
    totalToday: number;
    orders: IWebsocketOrders[];
}

export interface IWsConnectionFeedSuccess {
    readonly type: typeof WS_CONNECTION_FEED_SUCCESS;
}

export interface IWsConnectionFeedError {
    readonly type: typeof WS_CONNECTION_FEED_ERROR;
}

export interface IWsConnectionFeedStart {
    readonly type: typeof WS_CONNECTION_FEED_START;
}

export interface IWsConnectionFeedClosed {
    readonly type: typeof WS_CONNECTION_FEED_CLOSED;
}

export interface IGetOrderById {
    readonly type: typeof GET_ORDER_BY_ID;
    readonly payload: IWebsocketOrders[];
}

export interface IWsGetFeedOrders {
    readonly type: typeof WS_GET_FEED_ORDERS;
    readonly payload: Pick<IFeedState, 'orders'>;
}

export type TWsFeedActions = {
    wsFeedStart: typeof WS_CONNECTION_FEED_START;
    onFeedSuccess: typeof WS_CONNECTION_FEED_SUCCESS;
    onFeedClose: typeof WS_CONNECTION_FEED_ERROR;
    onFeedError: typeof WS_CONNECTION_FEED_CLOSED;
    onFeedOrders: typeof WS_GET_FEED_ORDERS;
    wsFeedUserStart: typeof WS_CONNECTION_FEED_USER_START;
};

export type TFeedActions =
    | IWsConnectionFeedSuccess
    | IWsConnectionFeedStart
    | IWsConnectionFeedClosed
    | IWsGetFeedOrders
    | IGetOrderById
    | IWsConnectionFeedError;
