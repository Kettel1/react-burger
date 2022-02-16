import { feedReducer } from './feed';
import {
    GET_ALL_ORDERS,
    getOrdersFeed,
    WsConnectionFeedClosed,
    WsConnectionFeedSuccess,
    WsGetFeedOrders
} from '../actions/feed';
import { IFeedState, IWebsocketOrders } from '../../types/feedTypes';
import { mockBun, mockFeedOrder, mockIngredient } from '../mockData';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { getAllIngredientsRequest, getAllIngredientsSuccess, getIngredients } from '../actions/burgerIngredients';

const initialState: IFeedState = {
    wsConnected: false,
    success: false,
    total: 0,
    totalToday: 0,
    orders: [],
};

describe('feed reducer', () => {

    it('should return initial state', () => {
        expect(feedReducer(undefined, {} as any)).toEqual({
            ...initialState
        })
    })

    it('should return connection success', () => {
        expect(feedReducer(undefined, WsConnectionFeedSuccess())).toEqual({
            ...initialState,
            wsConnected: true
        })
    })

    it('should return connection close', () => {

        expect(feedReducer(undefined, WsConnectionFeedClosed())).toEqual({
            ...initialState,
        })
    })

    it('should return feed orders', () => {
        const mockOrderFeed:IWebsocketOrders = {
            _id: '2323',
            ingredients: [mockIngredient._id],
            status: 'done',
            name: 'string',
            number: 10000,
            createdAt: 'some time',
            updateAt: 'some time',
        }

        const response: Omit<IFeedState, 'wsConnected'> = {
            orders: [mockOrderFeed],
            success: true,
            total: 1000,
            totalToday: 10
        }

        expect(feedReducer(undefined, WsGetFeedOrders(response))).toEqual({
            wsConnected: true,
            ...response
        })
    })
})

describe('async feed actions', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                orders: [mockFeedOrder, mockFeedOrder]
            }),
            ok: true
        } as any);
    });

    afterEach(() => [
        jest.resetAllMocks()
    ]);

    it('should return all orders', () => {
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        const expectedAction = [
            {type: GET_ALL_ORDERS, payload: [mockFeedOrder, mockFeedOrder]}
        ];

        const store = mockStore({});

        return store.dispatch(getOrdersFeed() as any).then(() => {
            expect(store.getActions()).toEqual(expectedAction)
        });
    })


})
