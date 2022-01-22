import {API_REACT} from "../../utils/data";
import {
    getAllIngredientsFailed,
    getAllIngredientsRequest,
    getAllIngredientsSuccess
} from "../reducers/burgerIngredients";

export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS'
export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST'
export const GET_ALL_INGREDIENTS_FAILED = 'GET_ALL_INGREDIENTS_FAILED'

export const fetchIngredients = () => (dispatch:any) => {
    dispatch(getAllIngredientsRequest())

    fetch(API_REACT + '/ingredients')
        .then(response => {
            if (!response.ok) {
                dispatch(getAllIngredientsFailed())
            } else {
                return response.json()
            }
        })
        .then(ingredients => {
            dispatch(getAllIngredientsSuccess(ingredients.data))
        })
        .catch(err => {
            console.log(err)
            dispatch(getAllIngredientsFailed())
        })

}

