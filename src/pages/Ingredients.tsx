import React, {FC} from 'react';
import IngredientDetails from "../compontents/modals/IngredientsDetails/IngredientDetails";
import IngredientsStyles from './Ingredients.module.scss'

const Ingredients:FC = () => {
    return (
        <div className={IngredientsStyles.container}>
            <IngredientDetails/>
        </div>
    );
};

export default Ingredients;
