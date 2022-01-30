import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    SET_INITIAL_ORDER_STATE
} from "../services/actions/order";

export interface IOrderState {
    orderSuccess: boolean,
    orderRequest: boolean,
    orderFailed: boolean,

    orderName: string,
    order: IOrderRequest
}

export interface IOrderRequest {
    number?: number
    name?: string
    success: boolean
}

export interface IGetOrderNumberRequest {
    readonly type: typeof GET_ORDER_NUMBER_REQUEST
}

export interface IGetOrderNumberSuccess {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS,
    readonly order: IOrderRequest,
    readonly success: boolean,
    readonly name: string,
}

export interface IGetOrderNumberFailed {
    readonly type: typeof GET_ORDER_NUMBER_FAILED
}

export interface ISetInitialOrderState {
    readonly type: typeof SET_INITIAL_ORDER_STATE
}

export type TOrderActions =
    | IGetOrderNumberRequest
    | IGetOrderNumberSuccess
    | IGetOrderNumberFailed
    | ISetInitialOrderState
