import React from 'react';
import IngredientDetailsStyles from "./IngredientsDetails.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

// @ts-ignore
const IngredientDetails = ({ingredientsInfo, onClose}) => {

    const {name, calories, fat, carbohydrates, proteins, image_large} = ingredientsInfo

    // @ts-ignore
    return (
        <div className={IngredientDetailsStyles.innerContainer}>
            <img src={image_large} alt={name}/>
            <button className={IngredientDetailsStyles.closeButton} onClick={onClose}><CloseIcon type="primary"/></button>
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
    )
};

export default IngredientDetails;
