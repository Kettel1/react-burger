import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import React from 'react';
import BurgerConstructorStyles from "./BurgerConstructor.module.scss"
import TotalBasketCount from "../TotalBasketCount/TotalBasketCount";
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_BUN_TO_CART,
    ADD_INGREDIENTS_TO_CART, UPDATE_INGREDIENTS_IN_CART
} from "../../services/actions/BurgerCounstructor";
import {useDrop} from "react-dnd";
import IngredientConstructorItem from "../IngredientConstructorItem/IngredientConstructorItem";
import update from 'immutability-helper';


const BurgerConstructor = () => {
    const cartState = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            if (item.type === 'bun' && !cartState.cartBun.length) {
                dispatch({type: ADD_BUN_TO_CART, bun: item})
            } else if (item.type !== 'bun' && cartState.cartBun.length !== 0) {
                dispatch({type: ADD_INGREDIENTS_TO_CART, ingredients: item})
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    })

    const renderBun = (direction) => {
        return (
            <ConstructorElement
                type={direction === "top" ? "top" : "bottom"}
                isLocked={true}
                text={direction === "top" ? `${cartState.cartBun.name} (верх)` : `${cartState.cartBun.name} (низ)`}
                price={cartState.cartBun.price}
                thumbnail={cartState.cartBun.image_mobile}
            />
        )
    }

    function debounce(func, wait, immediate) {
        let timeout;

        return function executedFunction() {
            const context = this;
            const args = arguments;

            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            const callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(later, wait);

            if (callNow) func.apply(context, args);
        };
    };

    const moveIngredients = React.useCallback((dragIndex, hoverIndex) => {
        const dragCard = cartState.cartIngredients[dragIndex];
        console.log(dragCard)

        const updateStateIngredient = update(cartState.cartIngredients, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        })

        dispatch({
            type: UPDATE_INGREDIENTS_IN_CART,
            item: updateStateIngredient,
        })
    }, [cartState.cartIngredients])

    const debounceMoveIngredients = debounce(moveIngredients)

    return (
        <section ref={dropTarget} className={BurgerConstructorStyles.container}>
            <div className={BurgerConstructorStyles.innerContainer}>
                {cartState.cartBun.length !== 0 && renderBun('top')}

                {cartState.cartIngredients.length === 0 && cartState.cartBun.length === 0
                    ?
                    <h2 className={isHover && BurgerConstructorStyles.test}>Корзина пуста!</h2>
                    :
                    <ul className={BurgerConstructorStyles.list}>
                        {cartState.cartIngredients.map((item, idx) => {
                            return <IngredientConstructorItem
                                key={item._id}
                                id={item._id}
                                item={item}
                                idx={idx}
                                moveCard={debounceMoveIngredients}
                            />
                        })
                        }
                    </ul>
                }

                {cartState.cartBun.length !== 0 && renderBun('bottom')}
            </div>
            <TotalBasketCount/>
        </section>
    )
};


export default BurgerConstructor;
