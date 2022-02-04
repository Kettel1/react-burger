import { API_REACT } from "../url";
import {AppDispatch, AppThunk} from "../../types";
import {
    IGetOrderNumberFailed,
    IGetOrderNumberRequest,
    IGetOrderNumberSuccess,
    IOrderRequest, ISetInitialOrderState
} from "../../types/ordersTypes";
import {getCookie} from "../helpers";
import {updateAccessToken} from "../api";

export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST'
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS'
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED'
export const SET_INITIAL_ORDER_STATE: 'SET_INITIAL_ORDER_STATE' = 'SET_INITIAL_ORDER_STATE'

export const getOrderNumber:AppThunk = (cart:Array<string>) => (dispatch: AppDispatch) => {
    dispatch(getOrderNumberRequest())
    const accessToken: string | undefined = getCookie('accessToken')

    if(accessToken) {
        fetch(API_REACT + '/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken
            },
            body: JSON.stringify({ingredients: cart})
        }).then(response => {
            if (!response.ok) {
                dispatch(getOrderNumberFailed())
                return response.json()
            } else {
                return response.json()
            }
        }).then(orderInfo => {
            dispatch(getOrderNumberSuccess(orderInfo.order, orderInfo.success, orderInfo.name))
        }).catch(err => {
            console.log(err)
            dispatch(getOrderNumberFailed())
        })
    } else {
        updateAccessToken()
        return getOrderNumber(cart)
    }
}


export const getOrderNumberRequest = (): IGetOrderNumberRequest => ({
    type: GET_ORDER_NUMBER_REQUEST
})

export const getOrderNumberSuccess =
    (order: IOrderRequest,
     success: boolean,
     name: string): IGetOrderNumberSuccess => ({
        type: GET_ORDER_NUMBER_SUCCESS,
        order: order,
        success: success,
        name: name
    })

export const getOrderNumberFailed = (): IGetOrderNumberFailed => ({
    type: GET_ORDER_NUMBER_FAILED
})

export const setInitialOrderState = (): ISetInitialOrderState => ({
    type: SET_INITIAL_ORDER_STATE
})
