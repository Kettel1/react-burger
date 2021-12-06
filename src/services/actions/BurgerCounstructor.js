import {API_REACT} from "../../utils/data";

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST'
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS'
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED'

export const ADD_INGREDIENTS_TO_CART = 'ADD_INGREDIENTS_TO_CART'
export const DELETE_INGREDIENTS_TO_CART = 'ADD_INGREDIENTS_TO_CART'
export const ADD_BUN_TO_CART = 'ADD_BUN_TO_CART'

export const TOTAL_SUN_CART = 'TOTAL_SUM_CART'
export const TOTAL_SUM_CART_BUN = 'TOTAL_SUM_CART_BUN'


export const getOrderNumber = (cart) => {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_NUMBER_REQUEST
        })

        fetch(API_REACT + '/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ingredients: cart})
        }).then(response => {
                if(!response.ok) {
                    dispatch({
                        type: GET_ORDER_NUMBER_FAILED,
                    })
                } else {
                    return response.json()
                }
            })
            .then(orderInfo => {

                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    order: orderInfo.order,
                    success: orderInfo.success,
                    name: orderInfo.name
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED
                })
            })

    }
}
