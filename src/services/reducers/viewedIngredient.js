import {REMOVE_VIEWED_INGREDIENT, SET_VIEWED_INGREDIENT} from "../actions/viewedIngredient";


const defaultState = {
    viewedIngredient: []
}

export const viewedIngredientReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_VIEWED_INGREDIENT:
            return {...state, viewedIngredient: action.ingredient}
        case REMOVE_VIEWED_INGREDIENT:
            return {...state, viewedIngredient: []}
        default:
            return state
    }
}
