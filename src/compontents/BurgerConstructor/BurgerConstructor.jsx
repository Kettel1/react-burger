import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import React from 'react';
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructor.module.scss"
import TotalBasketCount from "../TotalBasketCount/TotalBasketCount";
import {CartContext} from "../../services/CartContext";
import {TotalPriceContext} from "../../services/TotalPriceContext";


const startState = {
    totalSum: 0,
    totalBun: 0
}

const TOTAL_SUM_CART = 'TOTAL_SUM_CART'
const TOTAL_SUM_CART_BUN = 'TOTAL_SUM_CART_BUN'

const reducer = (state, action) => {

    switch (action.type) {
        case TOTAL_SUM_CART_BUN:
            return {totalBun: action.payload * 2, totalSum: state.totalSum}
        case TOTAL_SUM_CART:
            return {totalSum: action.payload, totalBun: state.totalBun}
        default:
            return state
    }
}


// @ts-ignore
const BurgerConstructor = () => {
    const [cartState] = React.useContext(CartContext)
    const [totalPriceState, dispatchTotalPriceState] = React.useReducer(reducer, startState, undefined)

    React.useEffect(() => {
        if (cartState.bun.length !== 0 && cartState.ingredients.length === 0) {
            dispatchTotalPriceState(
                {type: TOTAL_SUM_CART_BUN, payload: cartState.bun[0].price}
            )
        }
        if (cartState.ingredients.length !== 0) {
            const total = cartState.ingredients.reduce((prev, next) => prev + next.price, 0)
            // console.log(total)
            dispatchTotalPriceState({type: TOTAL_SUM_CART, payload: total})
        }

    }, [cartState])

    const renderBun = (direction) => {
        return (
            <ConstructorElement
            type={direction === "top" ? "top" : "bottom"}
            isLocked={true}
            text={direction === "top" ? "Краторная булка N-200i (верх)" : "Краторная булка N-200i (низ)"}
            price={cartState.bun[0].price}
            thumbnail={cartState.bun[0].image_mobile}
        />
        )
    }

    return (
        <TotalPriceContext.Provider value={[totalPriceState, dispatchTotalPriceState]}>
            <section className={BurgerConstructorStyles.container}>
                <div className={BurgerConstructorStyles.innerContainer}>
                    {cartState.bun.length !== 0 && renderBun('top')}

                    {cartState.ingredients.length === 0 && cartState.bun.length === 0
                        ?
                        <h2>Корзина пуста!</h2>
                        :
                        <ul className={BurgerConstructorStyles.list}>
                            {cartState.ingredients.map((item, idx) => {
                                return <li key={idx} className={BurgerConstructorStyles.item}>
                                    <DragIcon type={"primary"}/>
                                    <ConstructorElement text={item.name} price={item.price}
                                                        thumbnail={item.image_mobile}/>
                                </li>
                            })
                            }
                        </ul>
                    }

                    {cartState.bun.length !== 0 && renderBun('bottom')}
                </div>
                <TotalBasketCount/>
            </section>
        </TotalPriceContext.Provider>
    )
};


export default BurgerConstructor;
