import {
    GET_ALL_INGREDIENTS_SUCCESS,
    GET_ALL_INGREDIENTS_FAILED,
    GET_ALL_INGREDIENTS_REQUEST, SET_VIEWED_INGREDIENT, REMOVE_VIEWED_INGREDIENT,

} from "../actions/BurgerIngredients";

const defaultState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    viewedIngredient: []
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
            return {...state, ingredientsFailed: false, ingredientsRequest: false}
        }
        case SET_VIEWED_INGREDIENT:
            return {...state, viewedIngredient: action.ingredient}
        case REMOVE_VIEWED_INGREDIENT:
            return {...state, viewedIngredient: []}
        default:
            return state
    }
}
