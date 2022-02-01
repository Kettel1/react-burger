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
