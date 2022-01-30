import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['order', 'auth', 'ingredients']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
    let persistor = persistStore(store)
    return {store, persistor}
}
