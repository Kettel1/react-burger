import { IIngredient } from '../../types/ingredientTypes';
import {
    IAddBunToCart,
    IAddIngredientsToCart,
    IDeleteIngredientFromCart, ISetInitialCartState,
    ITotalSumBunsInCart,
    ITotalSumIngredientsInCart,
    IUpdateIngredientsInCart
} from '../../types/burgerConstructorTypes';

export const ADD_INGREDIENTS_TO_CART: 'ADD_INGREDIENTS_TO_CART' = 'ADD_INGREDIENTS_TO_CART';
export const DELETE_INGREDIENTS_FROM_CART: 'DELETE_INGREDIENTS_FROM_CART' = 'DELETE_INGREDIENTS_FROM_CART';
export const ADD_BUN_TO_CART: 'ADD_BUN_TO_CART' = 'ADD_BUN_TO_CART';

export const TOTAL_SUM_INGREDIENTS: 'TOTAL_SUM_INGREDIENTS' = 'TOTAL_SUM_INGREDIENTS';
export const TOTAL_SUM_BUN: 'TOTAL_SUM_BUN' = 'TOTAL_SUM_BUN';

export const UPDATE_INGREDIENTS_IN_CART: 'UPDATE_INGREDIENTS_IN_CART' = 'UPDATE_INGREDIENTS_IN_CART';
export const SET_INITIAL_CART_STATE: 'SET_INITIAL_CART_STATE' = 'SET_INITIAL_CART_STATE';

export const addBunToCart = (bun: IIngredient): IAddBunToCart => ({
    type: ADD_BUN_TO_CART,
    bun,
});

export const addIngredientsToCart = (ingredient: IIngredient, id: string): IAddIngredientsToCart => ({
    type: ADD_INGREDIENTS_TO_CART,
    ingredients: {
        ...ingredient,
        dragId: id,
    },
});

export const totalSumBunsInCart = (price: number): ITotalSumBunsInCart => ({
    type: TOTAL_SUM_BUN,
    payload: price,
});

export const totalSumIngredientsInCart = (price: number): ITotalSumIngredientsInCart => ({
    type: TOTAL_SUM_INGREDIENTS,
    payload: price,
});

export const deleteIngredientFromCart = (id: string): IDeleteIngredientFromCart => ({
    type: DELETE_INGREDIENTS_FROM_CART,
    id,
});

export const updateIngredientsInCart = (item: IIngredient[]): IUpdateIngredientsInCart => ({
    type: UPDATE_INGREDIENTS_IN_CART,
    item: item,
});

export const setInitialCartState = (): ISetInitialCartState => ({
    type: SET_INITIAL_CART_STATE,
});
