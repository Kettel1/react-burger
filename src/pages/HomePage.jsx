import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../services/actions/burgerIngredients";
import AppStyles from "../compontents/App/App.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredientsSkeleton from "../compontents/BurgerIngredientsSkeleton/BurgerIngredientsSkeleton";
import BurgerIngredients from "../compontents/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../compontents/BurgerConstructor/BurgerConstructor";

const HomePage = () => {
    const dispatch = useDispatch()
    const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector((state => state.ingredients))

    React.useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

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
