import {API_REACT} from "../../utils/data";

export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS'
export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST'
export const GET_ALL_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED'

export const fetchIngredients = () => (dispatch) => {
    dispatch({
        type: GET_ALL_INGREDIENTS_REQUEST
    })

    fetch(API_REACT + '/ingredients')
        .then(response => {
            if (!response.ok) {
                dispatch({
                    type: GET_ALL_INGREDIENTS_FAILED
                })
            } else {
                return response.json()
            }
        })
        .then(ingredients => {
            dispatch({
                type: GET_ALL_INGREDIENTS_SUCCESS,
                ingredients: ingredients.data,
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ALL_INGREDIENTS_FAILED
            })
        })

}

