import { IIngredient } from './ingredientTypes';
import {
    GET_ALL_INGREDIENTS_FAILED,
    GET_ALL_INGREDIENTS_REQUEST,
    GET_ALL_INGREDIENTS_SUCCESS,
} from '../services/actions/burgerIngredients';

export interface IIngredientsState {
    ingredients: IIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    isDragging: boolean;
}

export interface IGetAllIngredientsRequest {
    readonly type: typeof GET_ALL_INGREDIENTS_REQUEST;
}

export interface IGetAllIngredientsSuccess {
    readonly type: typeof GET_ALL_INGREDIENTS_SUCCESS;
    readonly ingredients: IIngredient[];
}

export interface IGetAllIngredientsFailed {
    readonly type: typeof GET_ALL_INGREDIENTS_FAILED;
}

export type TBurgerIngredientsActions =
    | IGetAllIngredientsRequest
    | IGetAllIngredientsSuccess
    | IGetAllIngredientsFailed;
