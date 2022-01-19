import React, {FC} from 'react';
import {useSelector} from "react-redux";
import AppStyles from "../compontents/App/App.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredientsSkeleton from "../compontents/BurgerIngredientsSkeleton/BurgerIngredientsSkeleton";
import BurgerIngredients from "../compontents/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../compontents/BurgerConstructor/BurgerConstructor";
import {RootState} from "../services/reducers";

const HomePage:FC = () => {
    const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector((state:RootState) => state.ingredients)

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