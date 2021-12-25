import {applyMiddleware, combineReducers, createStore} from "redux";
import { constructorReducer } from "./burgerCounstructor";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {ingredientsReducer} from "./burgerIngredients";
import {orderReducer} from "./order";
import {viewedIngredientReducer} from "./viewedIngredient";
import {authReducer} from "./auth";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    cart: constructorReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    viewedIngredient: viewedIngredientReducer,
    auth: authReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['order', 'viewedIngredient', 'auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
    let persistor = persistStore(store)
    return {store, persistor}
}

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
