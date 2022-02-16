import { orderReducer } from './order';
import { IOrderOwner, IOrderState, IOrderSuccess } from '../../types/ordersTypes';
import {
    getOrderNumber,
    getOrderNumberFailed,
    getOrderNumberRequest,
    getOrderNumberSuccess,
    setInitialOrderState
} from '../actions/order';
import { mockIngredient } from '../mockData';

const initialState: IOrderState = {
    orderSuccess: false,
    orderRequest: false,
    orderFailed: false,

    orderName: '',
    orderResponse: {} as IOrderSuccess
};

describe('ordersReducer', () => {
    const state = {
        orderSuccess: false,
        orderRequest: false,
        orderFailed: false,

        orderName: '',
        orderResponse: {} as IOrderSuccess
    }

    it('should return state', () => {
        expect(orderReducer(undefined, {} as any)).toEqual(
            {
                ...state
            }
        );
    });

    it('should return order request', () => {
        expect(orderReducer(state, getOrderNumberRequest())).toEqual(
            {
                ...state,
                orderRequest: true
            }
        )
    })

    it('should return order success', () => {
        const orderRequest: IOrderSuccess = {
            createdAt: 'string',
            ingredients: [mockIngredient, mockIngredient],
            name: 'Булочка',
            number: 10012,
            owner: {
                createdAt: 'string',
                email: 'string',
                name: 'string',
                updatedAt: 'string'
            },
            price: 120,
            status: 'done',
            updatedAt: '20',
            _id: '20'
        }

        expect(orderReducer(state, getOrderNumberSuccess(orderRequest, true, 'Бургер'))).toEqual(
            {
                ...state,
                orderRequest: false,
                orderResponse: orderRequest,
                orderSuccess: true,
                orderName: 'Бургер'
            }
        )
    })

    it('should return order failed', () => {
        expect(orderReducer(state, getOrderNumberFailed())).toEqual(
            {
                ...initialState,
                orderFailed: true,
            }
        )
    })

    it('should return initial state', () => {
        expect(orderReducer(state, setInitialOrderState())).toEqual({
            ...initialState
        })
    })

});
