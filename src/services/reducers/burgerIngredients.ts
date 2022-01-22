import {
    GET_ALL_INGREDIENTS_SUCCESS,
    GET_ALL_INGREDIENTS_FAILED,
    GET_ALL_INGREDIENTS_REQUEST,

} from "../actions/burgerIngredients";
import {IIngredient} from "../../types/ingredientTypes";

interface IIngredientsState {
    ingredients: IIngredient[],
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
    isDragging: boolean
}

interface IIngredientsAction {
    type: string,
    payload?: any,
    ingredients: IIngredient[]
}

const defaultState: IIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    isDragging: false
}

export const ingredientsReducer = (state = defaultState, action:IIngredientsAction): IIngredientsState => {
    switch (action.type) {
        case GET_ALL_INGREDIENTS_REQUEST: {
            return {...state, ingredientsRequest: true, ingredientsFailed: false}
        }
        case GET_ALL_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false
            }
        }
        case GET_ALL_INGREDIENTS_FAILED: {
            return {...defaultState, ingredientsFailed: true, ingredientsRequest: false}
        }
        default:
            return state
    }
}

export const getAllIngredientsRequest = () => {
    return {
        type: GET_ALL_INGREDIENTS_REQUEST
    }
}

export const getAllIngredientsSuccess = (ingredients:IIngredient[]) => {
    return {
        type: GET_ALL_INGREDIENTS_SUCCESS,
        ingredients: ingredients
    }
}

export const getAllIngredientsFailed = () => {
    return {
        type: GET_ALL_INGREDIENTS_FAILED
    }
}
