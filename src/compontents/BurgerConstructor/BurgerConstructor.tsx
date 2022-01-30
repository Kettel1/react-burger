import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element';
import React, {FC, useCallback, useMemo} from 'react';
import BurgerConstructorStyles from "./BurgerConstructor.module.scss"
import TotalBasketCount from "../TotalBasketCount/TotalBasketCount";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import IngredientConstructorItem from "../IngredientConstructorItem/IngredientConstructorItem";
import update from 'immutability-helper';
import {v4 as uuid} from 'uuid'
import {debounce} from "../../utils/helpers";
import {IIngredient} from "../../types/ingredientTypes";
import {addBunToCart, addIngredientsToCart, updateIngredientsInCart} from "../../services/reducers/burgerCounstructor";
import { RootState } from '../../types';


const BurgerConstructor: FC = () => {
    const cartState = useSelector((state:RootState) => state.cart)

    const dispatch = useDispatch()
    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop: (item:IIngredient) => {
            if (item.type === 'bun' && !cartState.cartBun.hasOwnProperty('name')) {
                dispatch(addBunToCart(item))
            } else if (item.type !== 'bun' && cartState.cartBun.hasOwnProperty('name')) {
                const uniqueId: string = uuid()
                dispatch(addIngredientsToCart(item, uniqueId))
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    })

    const renderBun = (direction: "top" | 'bottom') => {
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

    const moveIngredients = useCallback((dragIndex, hoverIndex) => {
        const dragCard = cartState.cartIngredients[dragIndex];
        const updateStateIngredient = update(cartState.cartIngredients, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        })

        dispatch(updateIngredientsInCart(updateStateIngredient))

    }, [cartState.cartIngredients, dispatch])

    const debounceMoveIngredients = useMemo(() => debounce(moveIngredients), [moveIngredients])

    const ingredientsIsDragging = isHover
        ? BurgerConstructorStyles.draggingContainer
        : BurgerConstructorStyles.test

    const highLightBorder = !isHover && cartState.cartIngredients.length === 0 && !cartState.cartBun.hasOwnProperty('name')
        && BurgerConstructorStyles.dashedContainer

    const assign = `${ingredientsIsDragging ? ingredientsIsDragging : ''} ${highLightBorder ? highLightBorder : ''}`

    return (
        <section ref={dropTarget} className={assign}>
            <div className={BurgerConstructorStyles.innerContainer}>
                {cartState.cartBun.hasOwnProperty('name') && renderBun('top')}

                {cartState.cartIngredients.length === 0 && !cartState.cartBun.hasOwnProperty('name')
                    ?
                    <section className={BurgerConstructorStyles.emptyCartContainer}>
                        <h2 className={BurgerConstructorStyles.emptyCartTitle}>Корзина пуста</h2>
                        <h3 className={BurgerConstructorStyles.emptyCartDescription}>Перетащите булочку, а затем
                            игредиенты</h3>
                    </section>
                    :
                    <ul className={BurgerConstructorStyles.list}>
                        {cartState.cartIngredients.map((item, idx) => {
                            return <IngredientConstructorItem
                                key={item.dragId}
                                id={item._id}
                                item={item}
                                idx={idx}
                                moveCard={debounceMoveIngredients}
                            />
                        })
                        }
                    </ul>
                }

                {cartState.cartBun.hasOwnProperty('name') && renderBun('bottom')}
            </div>

            {cartState.cartBun.hasOwnProperty('name') && <TotalBasketCount/>}

        </section>
    )
};


export default BurgerConstructor;
