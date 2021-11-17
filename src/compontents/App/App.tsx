import React from 'react';
import AppHeader from "../../compontents/AppHeader/AppHeader";
import BurgerIngredients from "../../compontents/BurgerIngredients/BurgerIngredients";
import AppStyles from "./App.module.css"
import { urlIngredients } from "../../utils/data";
import BurgerConstructor from "../../compontents/BurgerConstructor/BurgerConstructor";
import { cart } from '../../utils/cart';
import BurgerIngredientsSkeleton from "../BurgerIngredientsSkeleton/BurgerIngredientsSkeleton";

function App() {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
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
            getIngredients(urlIngredients)
                .then(data => setState({...state, data: data.data, isLoading: false}))
                .catch(e => setState({...state, isLoading: false, hasError: true, data: e}))
        }, 2500)


    }, [])

    const {hasError, isLoading, data} = state;

    return (
        <>
            <AppHeader/>
            <main className={AppStyles.container}>
                {isLoading && <BurgerIngredientsSkeleton/>}
                {hasError && 'Произошла ошибка'}
                {!isLoading &&
                 !hasError &&
                  data.length &&
                <BurgerIngredients ingredients={data} />
                }
                <BurgerConstructor ingredients={cart}/>
            </main>
        </>
    );
}

export default App;
