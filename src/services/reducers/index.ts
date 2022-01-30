import {combineReducers} from "redux";
import {constructorReducer} from "./burgerCounstructor";
import {ingredientsReducer} from "./burgerIngredients";
import {orderReducer} from "./order";
import {authReducer} from "./auth";

export const rootReducer = combineReducers({
    cart: constructorReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    auth: authReducer,
})


