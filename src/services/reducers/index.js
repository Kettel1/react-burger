import {applyMiddleware, combineReducers, createStore} from "redux";
import { constructorReducer } from "./burgerCounstructor";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {ingredientsReducer} from "./burgerIngredients";
import {orderReducer} from "./order";
import {viewedIngredientReducer} from "./viewedIngredient";




const rootReducer = combineReducers({
    cart: constructorReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    viewedIngredient: viewedIngredientReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
