import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import React from 'react';
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyles from "./BurgerConstructor.module.scss"
import TotalBasketCount from "../TotalBasketCount/TotalBasketCount";
import {CartContext} from "../../services/CartContext";


// @ts-ignore
const BurgerConstructor = () => {
    const [cartState] = React.useContext(CartContext)




    const renderBun = (direction) => {
        return (
            <ConstructorElement
                type={direction === "top" ? "top" : "bottom"}
                isLocked={true}
                text={direction === "top" ? `${cartState.bun[0].name} (верх)` : `${cartState.bun[0].name} (низ)`}
                price={cartState.bun[0].price}
                thumbnail={cartState.bun[0].image_mobile}
            />
        )
    }

    return (
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
    )
};


export default BurgerConstructor;
