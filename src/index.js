import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './compontents/App/App';
import {Provider} from "react-redux";
import reducers from "./services/reducers";
import {PersistGate} from 'redux-persist/integration/react'
import {BrowserRouter} from "react-router-dom";

const {persistor, store} = reducers()

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

