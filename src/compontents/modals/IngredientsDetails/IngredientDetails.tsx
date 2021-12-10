import React from 'react';
import IngredientDetailsStyles from "./IngredientsDetails.module.scss";
import PropTypes from "prop-types";
import ingredientsTypes from "../../../utils/types";
import {useSelector} from "react-redux";

// @ts-ignore
const IngredientDetails = () => {

    // @ts-ignore

    const {
        name,
        proteins,
        image_large,
        calories,
        fat,
        carbohydrates
    } = useSelector((state:any) => state.ingredients.viewedIngredient)

    return (
        <section className={IngredientDetailsStyles.container}>
            <div className={IngredientDetailsStyles.innerContainer}>
                <h1 className={IngredientDetailsStyles.header}>Детали ингредиента</h1>
                <img src={image_large} alt={name}/>
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
