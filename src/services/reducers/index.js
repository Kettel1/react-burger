import {applyMiddleware, combineReducers, createStore} from "redux";
import { constructorReducer } from "./BurgerCounstructor";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {ingredientsReducer} from "./BurgerIngredients";




const rootReducer = combineReducers({
    cart: constructorReducer,
    ingredients: ingredientsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
