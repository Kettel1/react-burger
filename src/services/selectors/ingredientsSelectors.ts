import {RootState} from "../../types";
import {IIngredient} from "../../types/ingredientTypes";

export const getIngredientsById = (state: RootState, id: string | null):IIngredient => {
    return state.ingredients.ingredients.filter(item => item._id === id)[0]
}

export const getMobileImagesById = (state: RootState, ingredients: string[]): string[] => {
    let images: string[] = []
    state.ingredients.ingredients.forEach((item) => {
        if (ingredients.includes(item._id)) {
            images.push(item.image_mobile)
        }
    })
    return images
}

export const getPriceIngredientsById = (state: RootState, ingredients: string[]): IIngredient[] => {
    return state.ingredients.ingredients.filter((item) => {
        if(ingredients.includes(item._id)) {
            return item
        }
    })
}

export const getTotalSumIngredients = (ingredients: IIngredient[]): number => {
    return ingredients.reduce((prev: number, next: IIngredient) => prev + next.price, 0)
}

export const getAllIdIngredientsInCart = (cart: IIngredient[]): string[] => {
    return cart.map((item) => item._id)
}

//TODO Типизация
export const getOrdersById = (orders:any, id:string | undefined):any => {
    return orders.find((item:any) => item._id === id)
}
