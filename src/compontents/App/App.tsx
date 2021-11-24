import React from 'react';
import AppHeader from "../../compontents/AppHeader/AppHeader";
import BurgerIngredients from "../../compontents/BurgerIngredients/BurgerIngredients";
import AppStyles from "./App.module.css"
import { URL_INGREDIENTS } from "../../utils/data";
import BurgerConstructor from "../../compontents/BurgerConstructor/BurgerConstructor";
import { cart } from '../../utils/cart';
import BurgerIngredientsSkeleton from "../BurgerIngredientsSkeleton/BurgerIngredientsSkeleton";

function App() {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        ingredients: []
    })

    const getIngredients = async (url: string) => {
        // setState({...state, isLoading: true, hasError: false})
        const ingredients = await fetch(url)
        if (!ingredients.ok) {
            throw new Error (`Непредвиденная ошибка`)
        }
        return await ingredients.json()
    }

    React.useEffect(() => {
        setState({...state, isLoading: true, hasError: false})
        // Искуственная задержка для отображения скелетон загрузки
        setTimeout(() => {
            getIngredients(URL_INGREDIENTS)
                .then(ingredientInfo => setState({...state, ingredients: ingredientInfo.data, isLoading: false}))
                .catch(e => setState({...state, isLoading: false, hasError: true, ingredients: e}))
        }, 2500)


    }, [])

    const {hasError, isLoading, ingredients} = state;

    return (
        <>
            <AppHeader/>
            <main className={AppStyles.container}>
                {isLoading && <BurgerIngredientsSkeleton/>}
                {hasError && 'Произошла ошибка'}
                {!isLoading &&
                 !hasError &&
                ingredients.length &&
                <BurgerIngredients ingredients={ingredients} />
                }
                <BurgerConstructor ingredients={cart}/>
            </main>
        </>
    );
}

export default App;
