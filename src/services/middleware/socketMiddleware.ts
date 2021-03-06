import { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { WsConnectionFeedSuccess, WsGetFeedOrders } from '../actions/feed';
import { getCookie } from '../helpers';
import { checkAuthUser } from '../api';
import { AppDispatch, RootState } from '../../types';
import { TWsFeedActions } from '../../types/feedTypes';

export const socketMiddleware = (wsUrl: string, wsActions: TWsFeedActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let url: string | undefined = '';
        let token: string | undefined = undefined;
        return (next) => async (action: AnyAction) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsFeedStart, wsFeedUserStart, onFeedClose, onFeedError } = wsActions;

            if (type === wsFeedStart) {
                url = wsUrl + '/all';
                socket = new WebSocket(wsUrl + '/all');
            } else if (type === wsFeedUserStart) {
                token = getCookie('accessToken');
                if (token) {
                    await checkAuthUser();
                    socket = new WebSocket(`${wsUrl}?token=${token.split(' ')[1]}`);
                } else {
                    console.log('токена нет');
                }
            }

            if (socket) {
                socket.onopen = (event) => {
                    console.log('open');
                    dispatch(WsConnectionFeedSuccess());
                };

                socket.onerror = (event) => {
                    console.log('onerror');
                    dispatch({ type: onFeedClose });
                };

                socket.onmessage = (event) => {
                    console.log('onmessage');
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    console.log(parsedData)
                    dispatch(WsGetFeedOrders(parsedData));
                };

                if (type === onFeedError) {
                    socket.close(1000, 'UnmountComponent');
                }

                socket.onclose = (event) => {
                    console.log('close');
                    if (event.code !== 1000) {
                        console.log(event.code);
                    }
                };
            }

            next(action);
        };
    };
};
