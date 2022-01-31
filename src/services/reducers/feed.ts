import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS

} from '../actions/feed';

const initialState = {
    wsConnected: false,
    success: false,
    total: 0,
    totalToday: 0,
    orders: []
};

//TODO Типизировать хранилище

export const feedReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
            };
        case WS_GET_ORDERS:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};
