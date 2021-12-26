import React from 'react';
import IngredientDetails from "../compontents/modals/IngredientsDetails/IngredientDetails";
import IngredientsStyles from './Ingredients.module.scss'

const Ingredients = () => {

    return (
        <div className={IngredientsStyles.container}>
            <IngredientDetails/>
        </div>
    );
};

export default Ingredients;
