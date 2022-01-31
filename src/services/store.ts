import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers";
import {socketMiddleware} from "./middleware/socketMiddleware";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS
} from "./actions/feed";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['order', 'auth', 'ingredients', 'feed']
}

const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onOrders: WS_GET_ORDERS
};

const wsUrl = 'wss://norma.nomoreparties.space/orders/all'


const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))))
    let persistor = persistStore(store)
    return {store, persistor}
}
