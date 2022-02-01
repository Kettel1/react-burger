import {AnyAction, MiddlewareAPI} from "redux";

export const socketMiddleware = (wsUrl:string, wsActions:any) => {
    return (store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return (next: any) => (action: AnyAction) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsInit, onOpen, onClose, onError, onOrders } = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(wsUrl);
            }

            if (socket) {

                socket.onopen = (event) => {
                    console.log('open')
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    console.log('onerror')
                    dispatch({ type: onError});
                };

                socket.onmessage = event => {
                    console.log('onmessage')
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    console.log(parsedData);
                    dispatch({ type: onOrders, payload: parsedData });
                };

                console.log(type)
                if(type === onClose) {
                    socket.close(1000, 'UnmountComponent')
                }

                socket.onclose = event => {
                    console.log('close')
                    console.log(event)
                    dispatch({ type: onClose, payload: event });
                };

            }

            next(action);
        };
    };
};
