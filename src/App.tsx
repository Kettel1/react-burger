import React from 'react';
import './App.css';
import AppHeader from "./compontents/AppHeader/appHeader";
import BurgerIngredients from "./compontents/BurgerIngredients/BurgerIngredients";
// @ts-ignore
import AppStyles from "./compontents/App/app.module.css"
import { data } from "./utils/data";
import BurgerConstructor from "./compontents/BurgerConstructor/BurgerConstructor";
import { cart } from './utils/cart';

function App() {
    return (
        <>
            <AppHeader/>
            <main className={AppStyles.container}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor ingredients={cart}/>
            </main>
        </>
    );
}

export default App;
