import {AnyAction, MiddlewareAPI} from "redux";
import {
    WsConnectionFeedClosed,
    WsConnectionFeedSuccess,
    WsGetFeedMessage,
} from "../actions/feed";

export const socketMiddleware = (wsUrl:string, wsActions:any, auth:boolean) => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return (next: any) => (action: AnyAction) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsFeedStart, wsFeedUserStart, onFeedClose, onFeedError } = wsActions;

            if (type === wsFeedStart && !auth) {
                console.log('Без токена')
                socket = new WebSocket(wsUrl);
            } else if (type === wsFeedUserStart && auth) {
                console.log('С токеном')
            }

            if (socket) {

                socket.onopen = (event) => {
                    console.log('open')
                    dispatch(WsConnectionFeedSuccess());
                };

                socket.onerror = event => {
                    console.log('onerror')
                    dispatch({ type: onFeedClose});
                };

                socket.onmessage = event => {
                    console.log('onmessage')
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(WsGetFeedMessage(parsedData));
                };

                if(type === onFeedError) {
                    socket.close(1000, 'UnmountComponent')
                }

                socket.onclose = event => {
                    console.log('close')
                    dispatch(WsConnectionFeedClosed());
                };

            }

            next(action);
        };
    };
};
