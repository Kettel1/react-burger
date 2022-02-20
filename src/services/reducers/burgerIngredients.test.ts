import { ingredientsReducer } from './burgerIngredients';
import { IIngredientsState } from '../../types/burgerIngredientsTypes';
import {
    getAllIngredientsFailed,
    getAllIngredientsRequest,
    getAllIngredientsSuccess, getIngredients
} from '../actions/burgerIngredients';
import { mockBun, mockIngredient } from '../mockData';
import { fetchIngredients } from '../api';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

describe('ingredients reducer', () => {
    const initialState: IIngredientsState = {
        ingredients: [],
        ingredientsRequest: false,
        ingredientsFailed: false,
        isDragging: false
    };

    it('should return all ingredients request', () => {
        expect(ingredientsReducer(undefined, getAllIngredientsRequest())).toEqual({
            ...initialState,
            ingredientsRequest: true,
            ingredientsFailed: false
        });
    });

    it('should return all ingredients success', () => {
        expect(ingredientsReducer(undefined, getAllIngredientsSuccess([mockIngredient, mockIngredient]))).toEqual({
            ...initialState,
            ingredients: [mockIngredient, mockIngredient],
            ingredientsRequest: false
        });
    });

    it('should return all ingredients failed', () => {
        expect(ingredientsReducer(undefined, getAllIngredientsFailed())).toEqual({
            ...initialState,
            ingredientsFailed: true,
            ingredientsRequest: false
        });
    });
});


describe('async get ingredients', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                success: true,
                data: [mockIngredient, mockBun]
            }),
            ok: true
        } as any);
    });

    afterEach(() => [
        jest.resetAllMocks()
    ]);

    it('should return ingredients', async () => {
        const result = await fetchIngredients();
        expect(result).toEqual({
            success: true,
            data: [mockIngredient, mockBun]
        })
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should return ingredients actions', async () => {
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        const expectedAction = [
            getAllIngredientsRequest(),
            getAllIngredientsSuccess([mockIngredient, mockBun])
        ];

        const store = mockStore({});

        return store.dispatch(getIngredients() as any).then(() => {
            expect(store.getActions()).toEqual(expectedAction)
        });
    });

});
