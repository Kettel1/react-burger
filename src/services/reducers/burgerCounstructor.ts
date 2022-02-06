import {
    ADD_BUN_TO_CART,
    ADD_INGREDIENTS_TO_CART,
    DELETE_ALL_INGREDIENTS_FROM_CART,
    DELETE_INGREDIENTS_FROM_CART,
    TOTAL_SUM_BUN,
    TOTAL_SUM_INGREDIENTS,
    UPDATE_INGREDIENTS_IN_CART,
} from '../actions/burgerCounstructor';

import { IIngredient } from '../../types/ingredientTypes';

import { IIngredientsState, TBurgerConstructorActions } from '../../types/burgerConstructorTypes';

const initialState: IIngredientsState = {
    cartBun: {} as IIngredient, // Выбранная булочка
    cartIngredients: [], // Выбранные ингредиенты

    totalSumIngredients: 0, // Общая сумма игредиентов
    totalSumBun: 0, // Общая сумма булочки
};

export const constructorReducer = (state = initialState, action: TBurgerConstructorActions): IIngredientsState => {
    switch (action.type) {
        case ADD_BUN_TO_CART:
            return {
                ...state,
                cartBun: action.bun,
            };

        case ADD_INGREDIENTS_TO_CART:
            return {
                ...state,
                cartIngredients: [...state.cartIngredients, action.ingredients],
            };

        case TOTAL_SUM_BUN:
            return {
                ...state,
                totalSumBun: action.payload * 2,
            };

        case TOTAL_SUM_INGREDIENTS:
            return {
                ...state,
                totalSumIngredients: action.payload,
            };

        case DELETE_INGREDIENTS_FROM_CART:
            return {
                ...state,
                cartIngredients: [
                    ...state.cartIngredients.filter((item: IIngredient, i) => item._id + i !== action.id),
                ],
            };

        case UPDATE_INGREDIENTS_IN_CART:
            return {
                ...state,
                cartIngredients: [...action.item],
            };

        case DELETE_ALL_INGREDIENTS_FROM_CART:
            return {
                ...state,
                cartIngredients: [],
                cartBun: {} as IIngredient,
            };

        default:
            return state;
    }
};
