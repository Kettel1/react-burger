import React, {FC} from 'react';
import {useSelector} from "../services/hooks";
import AppStyles from "../compontents/App/App.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredientsSkeleton from "../compontents/BurgerIngredientsSkeleton/BurgerIngredientsSkeleton";
import BurgerIngredients from "../compontents/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../compontents/BurgerConstructor/BurgerConstructor";


const HomePage:FC = () => {
    const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector(state => state.ingredients)

    return (
        <main className={AppStyles.container}>
            <DndProvider backend={HTML5Backend}>
                {ingredientsRequest && <BurgerIngredientsSkeleton/>}
                {ingredientsFailed && 'Произошла ошибка'}
                {!ingredientsRequest &&
                !ingredientsFailed &&
                ingredients.length &&
                <BurgerIngredients/>}
                <BurgerConstructor/>
            </DndProvider>
        </main>
    )
};

export default HomePage;
