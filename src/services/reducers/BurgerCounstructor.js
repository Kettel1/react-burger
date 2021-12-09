import {
    ADD_BUN_TO_CART,
    ADD_INGREDIENTS_TO_CART, DELETE_INGREDIENTS_FROM_CART,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS, TOTAL_SUM_BUN, TOTAL_SUM_INGREDIENTS, UPDATE_INGREDIENTS_IN_CART,
} from "../actions/BurgerCounstructor";

const initialState = {
    orderSuccess: false,
    orderRequest: false,
    orderFailed: false,

    orderName: '',
    order: {},

    cartBun: [],                  // Выбранная булочка
    cartIngredients: [],          // Выбранные ингредиенты

    totalSumIngredients: 0,       // Общая сумма игредиентов
    totalSumBun: 0,               // Общая сумма булочки
}


export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST:
            return {
                ...state,
                orderRequest: true
            }

        case GET_ORDER_NUMBER_SUCCESS:
            return {
                ...state,
                orderRequest: false,
                order: action.order,
                orderSuccess: action.success,
                orderName: action.name
            }

        case GET_ORDER_NUMBER_FAILED:
            return {
                ...state,
                orderFailed: true, orderRequest: false
            }
        case ADD_BUN_TO_CART:
            return {
                ...state,
                cartBun: action.bun
            }

        case ADD_INGREDIENTS_TO_CART:
            return {
                ...state,
                cartIngredients: [...state.cartIngredients, action.ingredients]
            }

        case TOTAL_SUM_BUN:
            return {
                ...state,
                totalSumBun: action.payload * 2
            }

        case TOTAL_SUM_INGREDIENTS:
            return {
                ...state,
                totalSumIngredients: action.payload
            }


        case DELETE_INGREDIENTS_FROM_CART:
            return {
                ...state,
                cartIngredients: [...state.cartIngredients.filter((item, i) => item._id + i !== action.id )]
                }

        case UPDATE_INGREDIENTS_IN_CART:
            return {
                ...state,
                cartIngredients: [...action.item]
            }

        default:
            return state
    }
}
