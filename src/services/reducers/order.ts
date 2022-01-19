import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS, SET_INITIAL_ORDER_STATE
} from "../actions/order";


interface IOrderState {
    orderSuccess: boolean,
    orderRequest: boolean,
    orderFailed: boolean,

    orderName: string,
    order: IOrderRequest
}

interface IOrderRequest{
    number?: number
    name?: string
    success: boolean
}


interface IOrderAction {
    type: string,
    payload: any
    order: IOrderRequest,
    success: boolean,
    name: string
}

const initialState: IOrderState = {
    orderSuccess: false,
    orderRequest: false,
    orderFailed: false,

    orderName: '',
    order: {} as IOrderRequest
}

export const orderReducer = (state = initialState, action: IOrderAction): IOrderState => {
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
        case SET_INITIAL_ORDER_STATE:
            return {...initialState}
        default:
            return state
    }
}
