import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './compontents/App/App';
import {Provider} from "react-redux";
import {store} from "./services/reducers";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

