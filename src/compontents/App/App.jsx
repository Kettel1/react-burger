import React from 'react';
import AppHeader from "../../compontents/AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyles from "./App.module.css"
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredientsSkeleton from "../BurgerIngredientsSkeleton/BurgerIngredientsSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/actions/BurgerIngredients";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

function App() {
    const dispatch = useDispatch()
    const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector(state => state.ingredients)

    React.useEffect(() => {
        dispatch(fetchIngredients())
    }, [])

    return (
        <>
            <AppHeader/>
            <main className={AppStyles.container}>
                <DndProvider backend={HTML5Backend}>
                    {ingredientsRequest && <BurgerIngredientsSkeleton/>}
                    {ingredientsFailed && 'Произошла ошибка'}
                    {!ingredientsRequest &&
                    !ingredientsFailed &&
                    ingredients.length &&
                    <BurgerIngredients/>
                    }
                    <BurgerConstructor/>
                </DndProvider>
            </main>

        </>
    );
}

export default App;
