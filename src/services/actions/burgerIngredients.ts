import {API_REACT} from "../url";

import {AppDispatch, AppThunk} from "../../types";
import {
    IGetAllIngredientsFailed,
    IGetAllIngredientsRequest,
    IGetAllIngredientsSuccess
} from "../../types/burgerIngredientsTypes";
import {IIngredient} from "../../types/ingredientTypes";

export const GET_ALL_INGREDIENTS_SUCCESS: 'GET_ALL_INGREDIENTS_SUCCESS' = 'GET_ALL_INGREDIENTS_SUCCESS'
export const GET_ALL_INGREDIENTS_REQUEST: 'GET_ALL_INGREDIENTS_REQUEST' = 'GET_ALL_INGREDIENTS_REQUEST'
export const GET_ALL_INGREDIENTS_FAILED: 'GET_ALL_INGREDIENTS_FAILED' = 'GET_ALL_INGREDIENTS_FAILED'

export const fetchIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getAllIngredientsRequest())

    fetch(API_REACT + '/ingredients')
        .then(response => {
            if (!response.ok) {
                dispatch(getAllIngredientsFailed())
            }
            return response.json()

        })
        .then(ingredients => {
            dispatch(getAllIngredientsSuccess(ingredients.data))
        })
        .catch(err => {
            console.log(err)
            dispatch(getAllIngredientsFailed())
        })
}

export const getAllIngredientsRequest = (): IGetAllIngredientsRequest => ({
    type: GET_ALL_INGREDIENTS_REQUEST
})

export const getAllIngredientsSuccess = (ingredients: IIngredient[]): IGetAllIngredientsSuccess => ({
    type: GET_ALL_INGREDIENTS_SUCCESS,
    ingredients: ingredients
})

export const getAllIngredientsFailed = (): IGetAllIngredientsFailed => ({
    type: GET_ALL_INGREDIENTS_FAILED
})
