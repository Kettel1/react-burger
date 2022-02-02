import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./reducers";
import {socketMiddleware} from "./middleware/socketMiddleware";
import {
    WS_CONNECTION_FEED_CLOSED,
    WS_CONNECTION_FEED_ERROR,
    WS_CONNECTION_FEED_START,
    WS_CONNECTION_FEED_SUCCESS, WS_CONNECTION_FEED_USER_START, WS_GET_FEED_ORDERS,
} from "./actions/feed";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['order', 'auth', 'ingredients', 'allFeed']
}

const wsFeedActions = {
    wsFeedStart: WS_CONNECTION_FEED_START,
    onFeedSuccess: WS_CONNECTION_FEED_SUCCESS,
    onFeedClose: WS_CONNECTION_FEED_ERROR,
    onFeedError: WS_CONNECTION_FEED_CLOSED,
    onFeedOrders: WS_GET_FEED_ORDERS,
};

const wsFeedUserActions = {
    wsFeedUserStart: WS_CONNECTION_FEED_USER_START
}

const wsUrl = 'wss://norma.nomoreparties.space/orders/all'


const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(
        thunk,
        socketMiddleware(wsUrl, wsFeedActions, false),
        socketMiddleware(wsUrl, wsFeedUserActions, true)
    )))
    let persistor = persistStore(store)
    return {store, persistor}
}
