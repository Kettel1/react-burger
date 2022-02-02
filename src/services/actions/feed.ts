import {
    IFeedState,
    IWsConnectionFeedClosed,
    IWsConnectionFeedStart,
    IWsConnectionFeedSuccess,
    IWsGetFeedOrders
} from "../../types/feedTypes";


export const WS_CONNECTION_FEED_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_FEED_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_FEED_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_FEED_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_FEED_ORDERS = 'WS_GET_ORDERS';

export const WS_CONNECTION_FEED_USER_START = 'WS_CONNECTION_FEED_USER_START';
export const WS_CONNECTION_FEED_USER_SUCCESS = 'WS_CONNECTION_FEED_USER_SUCCESS';
export const WS_CONNECTION_FEED_USER_ERROR = 'WS_CONNECTION_FEED_USER_ERROR';
export const WS_CONNECTION_FEED_USER_CLOSED = 'WS_CONNECTION_FEED_USER_CLOSED';
export const WS_GET_FEED_USER_ORDERS = 'WS_GET_FEED_USER_ORDERS';


export const WsConnectionFeedStart = (): IWsConnectionFeedStart => ({
    type: WS_CONNECTION_FEED_START
})

export const WsConnectionFeedSuccess = (): IWsConnectionFeedSuccess => ({
    type: WS_CONNECTION_FEED_SUCCESS
})

export const WsConnectionFeedClosed = (): IWsConnectionFeedClosed => ({
    type: WS_CONNECTION_FEED_CLOSED
})

export const WsGetFeedMessage = (parsedData:Omit<IFeedState, 'wsConnected'>):IWsGetFeedOrders => ({
    type: WS_GET_FEED_ORDERS,
    payload: parsedData
})
