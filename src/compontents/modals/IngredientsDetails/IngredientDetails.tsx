import React, {FC} from 'react';
import IngredientDetailsStyles from "./IngredientsDetails.module.scss";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {RootState} from "../../../services/reducers";
import {IIngredient} from "../../../types/ingredientTypes";


const IngredientDetails: FC = () => {
    const {id} = useParams()
    const {ingredients} = useSelector((state: RootState) => state.ingredients)
    const currentIngredient: IIngredient | undefined = ingredients.find((ingredient: IIngredient) => ingredient._id === id)




    return (
        currentIngredient
            ?
            <section className={IngredientDetailsStyles.container}>
                <div className={IngredientDetailsStyles.innerContainer}>
                    <h1 className={IngredientDetailsStyles.header}>Детали ингредиента</h1>
                    <img className={IngredientDetailsStyles.image} src={currentIngredient.image_large}
                         alt={currentIngredient.name}/>
                    <p className={IngredientDetailsStyles.name}>{currentIngredient.name}</p>
                    <ul className={IngredientDetailsStyles.list}>
                        <li className={IngredientDetailsStyles.item}>
                            <p>Калорий, ккал</p>
                            <span>{currentIngredient.calories}</span>
                        </li>
                        <li className={IngredientDetailsStyles.item}>
                            <p>Белки, г</p>
                            <span>{currentIngredient.proteins}</span>
                        </li>
                        <li className={IngredientDetailsStyles.item}>
                            <p>Жиры, г</p>
                            <span>{currentIngredient.fat}</span>
                        </li>
                        <li className={IngredientDetailsStyles.item}>
                            <p>Углеводы, г</p>
                            <span>{currentIngredient.carbohydrates}</span>
                        </li>
                    </ul>
                </div>
            </section>
            :
            <p>Произошла ошибка</p>
    )
};


export default IngredientDetails;
