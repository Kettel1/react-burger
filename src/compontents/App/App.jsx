import React from 'react';
import AppHeader from "../../compontents/AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyles from "./App.module.css"
import {API_REACT} from "../../utils/data";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredientsSkeleton from "../BurgerIngredientsSkeleton/BurgerIngredientsSkeleton";
import {BurgerContext} from "../../services/BurgerConstructorContext";
import {CartContext} from '../../services/CartContext';
import {CreateOrderContext} from '../../services/CreateOrderContext';

function App() {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        ingredients: [],
        order: {
            orderNumber: ""
        },
    })

    const [orderState, setOrderState] = React.useState({
        success: false,
        name: '',
        order: {},
    })

    const [cartState, setCartState] = React.useState({
        bun: [],
        ingredients: []
    })

    React.useEffect(() => {
        setState({...state, isLoading: true, hasError: false})
        getIngredients(API_REACT)
            .then(ingredientInfo => {
                setState({...state, ingredients: ingredientInfo.data, isLoading: false})
            })
            .catch(e => setState({...state, isLoading: false, hasError: true, ingredients: e}))
    }, [])


    // @ts-ignore
    const getIngredients = async (url) => {
        setState({...state, isLoading: true, hasError: false})
        const ingredients = await fetch(url + '/ingredients')
        if (!ingredients.ok) {
            throw new Error(`Непредвиденная ошибка`)
        }
        return await ingredients.json()
    }

    // @ts-ignore
    const getOrderNumber = async (cart) => {
        const response = await fetch(API_REACT + '/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ingredients: cart})
        })
        if (response.ok) {
            return await response.json();
        }
    }


    const {hasError, isLoading, ingredients} = state;

    // @ts-ignore
    return (
        <>
            <AppHeader/>
            <main className={AppStyles.container}>

                <CartContext.Provider value={[cartState, setCartState]}>
                    <BurgerContext.Provider value={ingredients}>
                        <CreateOrderContext.Provider value={{getOrderNumber, orderState, setOrderState}}>
                            {isLoading && <BurgerIngredientsSkeleton/>}
                            {hasError && 'Произошла ошибка'}
                            {!isLoading &&
                            !hasError &&
                            ingredients.length &&
                            <BurgerIngredients ingredients={ingredients}/>
                            }

                            <BurgerConstructor/>
                        </CreateOrderContext.Provider>
                    </BurgerContext.Provider>
                </CartContext.Provider>
            </main>
        </>
    );
}

export default App;
