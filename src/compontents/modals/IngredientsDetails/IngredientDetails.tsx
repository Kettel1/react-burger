import React from 'react';
import IngredientDetailsStyles from "./IngredientsDetails.module.scss";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

// @ts-ignore
const IngredientDetails = () => {
    const {id} = useParams()

    // @ts-ignore
    const {ingredients} = useSelector((state => state.ingredients))

    // @ts-ignore
    const currentIngredient = ingredients.find((ingredient) => ingredient._id === id)

    // @ts-ignore
    const {
        name,
        proteins,
        image_large,
        calories,
        fat,
        carbohydrates
    } = currentIngredient

    return (
        <section className={IngredientDetailsStyles.container}>
            <div className={IngredientDetailsStyles.innerContainer}>
                <h1 className={IngredientDetailsStyles.header}>Детали ингредиента</h1>
                <img className={IngredientDetailsStyles.image} src={image_large} alt={name}/>
                <p className={IngredientDetailsStyles.name}>{name}</p>
                <ul className={IngredientDetailsStyles.list}>
                    <li className={IngredientDetailsStyles.item}>
                        <p>Калорий, ккал</p>
                        <span>{calories}</span>
                    </li>
                    <li className={IngredientDetailsStyles.item}>
                        <p>Белки, г</p>
                        <span>{proteins}</span>
                    </li>
                    <li className={IngredientDetailsStyles.item}>
                        <p>Жиры, г</p>
                        <span>{fat}</span>
                    </li>
                    <li className={IngredientDetailsStyles.item}>
                        <p>Углеводы, г</p>
                        <span>{carbohydrates}</span>
                    </li>
                </ul>
            </div>
        </section>
    )
};


export default IngredientDetails;
