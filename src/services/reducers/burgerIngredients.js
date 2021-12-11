import {
    GET_ALL_INGREDIENTS_SUCCESS,
    GET_ALL_INGREDIENTS_FAILED,
    GET_ALL_INGREDIENTS_REQUEST,

} from "../actions/burgerIngredients";

const defaultState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const ingredientsReducer = (state = defaultState, action) => {
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
