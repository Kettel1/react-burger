import { constructorReducer } from './burgerConstructor';
import { IIngredientsState } from '../../types/burgerConstructorTypes';
import { IIngredient } from '../../types/ingredientTypes';
import {
    addBunToCart,
    addIngredientsToCart, deleteIngredientFromCart, setInitialCartState,
    totalSumBunsInCart,
    totalSumIngredientsInCart, updateIngredientsInCart
} from '../actions/burgerCounstructor';
import fetchMock from 'fetch-mock';
import { mockBun, mockIngredient } from '../mockData';

const initialState: IIngredientsState = {
    cartBun: {} as IIngredient,
    cartIngredients: [],

    totalSumIngredients: 0,
    totalSumBun: 0,
};


describe('constructor reducer', () => {
    it('should return initial state', () => {
        expect(constructorReducer(undefined, {} as any)).toEqual({
            ...initialState
        })
    })

    it('should return add bun to cart', () => {
        expect(constructorReducer(undefined, addBunToCart(mockBun))).toEqual({
            ...initialState,
            cartBun: {...mockBun}
        })
    })

    it('should return add ingredient to cart', () => {
        const state = {
            cartBun: {} as IIngredient,
            cartIngredients: [mockBun, mockIngredient],

            totalSumIngredients: 0,
            totalSumBun: 0,
        }

        expect(constructorReducer(state, addIngredientsToCart(mockBun, 'drag'))).toEqual({
            ...state,
            cartIngredients: [...state.cartIngredients, mockBun]
        })
    })

    it('should return total sum bun', () => {
        expect(constructorReducer(undefined, totalSumBunsInCart(50))).toEqual({
            ...initialState,
            totalSumBun: 100
        })
    })

    it('should return total sum ingredients', () => {
        expect(constructorReducer(undefined, totalSumIngredientsInCart(50))).toEqual({
            ...initialState,
            totalSumIngredients: 50
        })
    })

    it('should return delete ingredients from cart', () => {
        const state: IIngredientsState = {
            cartBun: {} as IIngredient,
            cartIngredients: [mockBun, mockIngredient],

            totalSumIngredients: 0,
            totalSumBun: 0,
        }
            // 60d3b41abdacab0026a733c6 = _id ингредиента mockBun
            // Для того чтобы корректно элементы удалялись им добавляется индекс элемента массива
            // В данном случае индекс первого элемента равен 0, идет его добавление к _id и элемент bun
            //      удаляется с корзины

        expect(constructorReducer(state, deleteIngredientFromCart('60d3b41abdacab0026a733c60'))).toEqual({
            ...initialState,
            cartIngredients: [mockIngredient]
        })

        expect(constructorReducer(state, deleteIngredientFromCart('60d3b41abdacab0026a733c71'))).toEqual({
            ...initialState,
            cartIngredients: [mockBun]
        })

    })

    it('should return updated ingredients in cart', () => {
        const state:IIngredientsState = {
            cartBun: {} as IIngredient,
            cartIngredients: [mockBun],

            totalSumIngredients: 0,
            totalSumBun: 0,
        }

        expect(constructorReducer(state, updateIngredientsInCart([mockIngredient]))).toEqual({
            ...initialState,
            cartIngredients: [mockIngredient]
        })
    })

    it('should delete all ingredients from cart', () => {
        const state:IIngredientsState = {
            cartBun: {} as IIngredient,
            cartIngredients: [mockBun, mockIngredient],

            totalSumIngredients: 0,
            totalSumBun: 0,
        }
        expect(constructorReducer(state, setInitialCartState())).toEqual({
            ...initialState
        })
    })
})
