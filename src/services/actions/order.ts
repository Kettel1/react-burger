import {API_REACT} from "../../utils/data";
import {getOrderNumberFailed, getOrderNumberRequest, getOrderNumberSuccess} from "../reducers/order";

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST'
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS'
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED'
export const SET_INITIAL_ORDER_STATE = 'SET_INITIAL_ORDER_STATE'

export const getOrderNumber = (cart:Array<string>) => (dispatch:any) => {
    dispatch(getOrderNumberRequest())

    fetch(API_REACT + '/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
}
