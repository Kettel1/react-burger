import {
    ADD_BUN_TO_CART,
    ADD_INGREDIENTS_TO_CART,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
} from "../actions/BurgerCounstructor";

const initialState = {
    orderSuccess: false,
    orderRequest: false,
    orderFailed: false,
    orderName: '',
    order: {},
    cartBun: [],
    cartIngredients: []
}


export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST: {
            return {...state, orderRequest: true}
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                order: action.order,
                orderSuccess: action.success,
                orderName: action.name
            }
        }
        case GET_ORDER_NUMBER_FAILED:
            return {...state, orderFailed: true,  orderRequest: false}
        case ADD_BUN_TO_CART:
            return {...state, cartBun: action.bun}
        case ADD_INGREDIENTS_TO_CART:
            return {...state, cartIngredients: [...state.cartIngredients, action.ingredients]}
        default:
            return state
    }
}
