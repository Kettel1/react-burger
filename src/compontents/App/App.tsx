import React from 'react';
import AppHeader from "../../compontents/AppHeader/AppHeader";
import BurgerIngredients from "../../compontents/BurgerIngredients/BurgerIngredients";
import AppStyles from "./App.module.css"
import { data } from "../../utils/data";
import BurgerConstructor from "../../compontents/BurgerConstructor/BurgerConstructor";
import { cart } from '../../utils/cart';

function App() {
    return (
        <>
            <AppHeader/>
            <main className={AppStyles.container}>
                <BurgerIngredients ingredients={data}/>
                <BurgerConstructor ingredients={cart}/>
            </main>
        </>
    );
}

export default App;
