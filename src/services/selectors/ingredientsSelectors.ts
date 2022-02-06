import {RootState} from "../../types";
import {IIngredient} from "../../types/ingredientTypes";
import {IWebsocketOrders} from "../../types/feedTypes";

export const getIngredientsById = (state: RootState, id: string | null):IIngredient => {
    return state.ingredients.ingredients.filter(item => item._id === id)[0]
}

export const getPriceById = (state: RootState, id: string | null):number => {
    return state.ingredients.ingredients.filter(item => item._id === id)[0].price
}

// Типизировать


export const getMobileImagesById = (state: RootState, ingredients: string[]): string[] => {
    let images: string[] = []
    ingredients.forEach((item: string) => {
        const ingredientImage = getIngredientsById(state, item).image_mobile
        images.push(ingredientImage)
    })
    return images
}

export const getArrayIngredientsById = (state: RootState, ingredients: string[]): IIngredient[] => {
    let ingredient: IIngredient[] = []
    ingredients.forEach((item: string) => {
        const ingredientImage = getIngredientsById(state, item)
        ingredient.push(ingredientImage)
    })
    return ingredient
}

export const getTotalSumIngredients = (ingredients: IIngredient[]): number => {
    return ingredients.reduce((prev: number, next: IIngredient) => prev + next.price, 0)
}

export const getAllIdIngredientsInCart = (cart: IIngredient[]): string[] => {
    return cart.map((item) => item._id)
}

export const getOrdersById = (orders:IWebsocketOrders[], id:string | undefined):IWebsocketOrders | undefined => {
    return orders.find((item) => item._id === id)
}

export const getAmountByIngredientsId = (state: RootState, ingredients: string []): number => {
    let amount = 0
    ingredients.forEach((item) => {
        amount = amount + getPriceById(state, item)
    })
    return amount
}
