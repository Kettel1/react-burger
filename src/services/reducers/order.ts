import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    SET_INITIAL_ORDER_STATE,
} from '../actions/order';
import { IOrderRequest, IOrderState, IOrderSuccess, TOrderActions } from '../../types/ordersTypes';

const initialState: IOrderState = {
    orderSuccess: false,
    orderRequest: false,
    orderFailed: false,

    orderName: '',
    orderResponse: {} as IOrderSuccess,
};

export const orderReducer = (state = initialState, action: TOrderActions): IOrderState => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST:
            return {
                ...state,
                orderRequest: true,
            };

        case GET_ORDER_NUMBER_SUCCESS:
            return {
                ...state,
                orderRequest: false,
                orderResponse: action.order,
                orderSuccess: action.success,
                orderName: action.name,
            };

        case GET_ORDER_NUMBER_FAILED:
            return {
                ...initialState,
                orderFailed: true,
                orderRequest: false,
            };
        case SET_INITIAL_ORDER_STATE:
            return { ...initialState };
        default:
            return state;
    }
};
