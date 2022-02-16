import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    SET_INITIAL_ORDER_STATE,
} from '../services/actions/order';
import { IIngredient } from './ingredientTypes';

export interface IOrderState {
    orderSuccess: boolean;
    orderRequest: boolean;
    orderFailed: boolean;

    orderName: string;
    orderResponse: IOrderSuccess;
}

export interface IOrderOwner {
    createdAt: string,
    email: string,
    name: string,
    updatedAt: string
}

export interface IOrderSuccess {
    createdAt: string,
    ingredients: IIngredient[],
    name: string,
    number: number,
    owner: IOrderOwner,
    price: number,
    status: 'done' | 'pending' | 'created',
    updatedAt: string,
    _id: string
}

export interface IOrderRequest {
    order: IOrderSuccess
    name: string;
    success: boolean;
}

export interface IGetOrderNumberRequest {
    readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberSuccess {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
    readonly order: IOrderSuccess;
    readonly success: boolean;
    readonly name: string;
}

export interface IGetOrderNumberFailed {
    readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface ISetInitialOrderState {
    readonly type: typeof SET_INITIAL_ORDER_STATE;
}

export type TOrderActions =
    | IGetOrderNumberRequest
    | IGetOrderNumberSuccess
    | IGetOrderNumberFailed
    | ISetInitialOrderState;
