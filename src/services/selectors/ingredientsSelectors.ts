import {RootState} from "../../types";
import {IIngredient} from "../../types/ingredientTypes";

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

//TODO Типизировать
export const getArrayIngredientsById = (state: RootState, ingredients: string[]): IIngredient[] => {
    let ingredient: any = []
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

//TODO Типизация
export const getOrdersById = (orders:any, id:string | undefined):any => {
    return orders.find((item:any) => item._id === id)
}

export const getAmountByIngredientsId = (state: RootState, ingredients: string []): number => {
    let amount = 0
    ingredients.forEach((item) => {
        amount = amount + getPriceById(state, item)
    })
    return amount
}

// export const testFunc = (array:IIngredient[]) => {
//     array.forEach(item => {
//         for(let i = 0; i <= array.length - 1; i++) {
//             if(array[i]._id === item._id) {
//                 console.log(item)
//             } else {
//
//             }
//         }
//     })
// }

