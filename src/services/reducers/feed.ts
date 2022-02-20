import {
    GET_ALL_ORDERS,
    WS_CONNECTION_FEED_CLOSED,
    WS_CONNECTION_FEED_SUCCESS,
    WS_GET_FEED_ORDERS,
} from '../actions/feed';

import { IFeedState, TFeedActions } from '../../types/feedTypes';

const initialState: IFeedState = {
    wsConnected: false,
    success: false,
    total: 0,
    totalToday: 0,
    orders: [],
};

export const feedReducer = (state = initialState, action: TFeedActions): IFeedState => {
    switch (action.type) {
        case WS_CONNECTION_FEED_SUCCESS:
            return { ...state, wsConnected: true };

        case WS_GET_FEED_ORDERS:
            return { ...state, wsConnected: true, ...action.payload };

        case GET_ALL_ORDERS:
            return { ...state, orders: [...action.payload] };

        case WS_CONNECTION_FEED_CLOSED:
            return { ...initialState };

        default:
            return state;
    }
};
