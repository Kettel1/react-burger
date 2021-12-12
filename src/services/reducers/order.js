import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS
} from "../actions/order";

const initialState = {
    orderSuccess: false,
    orderRequest: false,
    orderFailed: false,

    orderName: '',
    order: {}
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST:
            return {
                ...state,
                orderRequest: true
            }

        case GET_ORDER_NUMBER_SUCCESS:
            return {
                ...state,
                orderRequest: false,
                order: action.order,
                orderSuccess: action.success,
                orderName: action.name
            }

        case GET_ORDER_NUMBER_FAILED:
            return {
                ...initialState,
                orderFailed: true, orderRequest: false
            }
        default:
            return state
    }
}
