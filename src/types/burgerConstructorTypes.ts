import { IIngredient } from './ingredientTypes';
import {
    ADD_BUN_TO_CART,
    ADD_INGREDIENTS_TO_CART,
    DELETE_INGREDIENTS_FROM_CART, SET_INITIAL_CART_STATE,
    TOTAL_SUM_BUN,
    TOTAL_SUM_INGREDIENTS,
    UPDATE_INGREDIENTS_IN_CART
} from '../services/actions/burgerCounstructor';

export interface IIngredientsState {
    cartBun: IIngredient;
    cartIngredients: IIngredient[];

    totalSumIngredients: number;
    totalSumBun: number;
}

export interface IAddBunToCart {
    readonly type: typeof ADD_BUN_TO_CART;
    readonly bun: IIngredient;
}

export interface IAddIngredientsToCart {
    readonly type: typeof ADD_INGREDIENTS_TO_CART;
    readonly ingredients: IIngredient;
}

export interface ITotalSumBunsInCart {
    readonly type: typeof TOTAL_SUM_BUN;
    readonly payload: number;
}

export interface ITotalSumIngredientsInCart {
    readonly type: typeof TOTAL_SUM_INGREDIENTS;
    readonly payload: number;
}

export interface IDeleteIngredientFromCart {
    readonly type: typeof DELETE_INGREDIENTS_FROM_CART;
    readonly id: string;
}

export interface IUpdateIngredientsInCart {
    readonly type: typeof UPDATE_INGREDIENTS_IN_CART;
    readonly item: IIngredient[];
}

export interface ISetInitialCartState {
    readonly type: typeof SET_INITIAL_CART_STATE;
}

export type TBurgerConstructorActions =
    | IAddBunToCart
    | IAddIngredientsToCart
    | ITotalSumBunsInCart
    | ITotalSumIngredientsInCart
    | IDeleteIngredientFromCart
    | IUpdateIngredientsInCart
    | ISetInitialCartState;
