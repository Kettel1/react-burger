import React from 'react';
import AppHeader from "../../compontents/AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import AppStyles from "./App.module.css"
import {API_REACT} from "../../utils/data";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredientsSkeleton from "../BurgerIngredientsSkeleton/BurgerIngredientsSkeleton";
import {CartContext} from '../../services/CartContext';
import {CreateOrderContext} from '../../services/CreateOrderContext';


import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/actions/BurgerIngredients";

function App() {

    const dispatch = useDispatch()

    const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector(state => state.ingredients)

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
        dispatch(fetchIngredients())
    }, [])


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
        } else {
            setOrderState({...orderState, success: false})
        }
    }


    // @ts-ignore
    return (
        <>
            <AppHeader/>
            <main className={AppStyles.container}>
                <CartContext.Provider value={[cartState, setCartState]}>
                    <CreateOrderContext.Provider value={{getOrderNumber, orderState, setOrderState}}>
                        {ingredientsRequest && <BurgerIngredientsSkeleton/>}
                        {ingredientsFailed && 'Произошла ошибка'}
                        {!ingredientsRequest &&
                        !ingredientsFailed &&
                        ingredients.length &&
                        <BurgerIngredients/>
                        }


                        <BurgerConstructor/>
                    </CreateOrderContext.Provider>
                </CartContext.Provider>
            </main>

        </>
    );
}

export default App;
