import React, { FC } from 'react';
import IngredientDetailsStyles from './IngredientsDetails.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../../services/hooks';

const IngredientDetails: FC = () => {
    const { id } = useParams();

    const { ingredients } = useSelector((state) => state.ingredients);

    const { cartIngredients } = useSelector((state) => state.cart);

    const currentIngredient = ingredients.find((ingredient) => ingredient._id === id);

    if(!cartIngredients.length) {
        return (
            <section className={IngredientDetailsStyles.errorContainer}>
                <p className={IngredientDetailsStyles.errorTitle}>
                    Ошибка
                </p>
                <p className={IngredientDetailsStyles.errorText}>
                    Сначала необходимо выбрать булочку
                </p>
            </section>
        )
    }

    return currentIngredient ? (
        <section className={IngredientDetailsStyles.container}>
            <div className={IngredientDetailsStyles.innerContainer}>
                <h1 className={IngredientDetailsStyles.header}>Детали ингредиента</h1>
                <img
                    className={IngredientDetailsStyles.image}
                    src={currentIngredient.image_large}
                    alt={currentIngredient.name}
                />
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

            <p className={IngredientDetailsStyles.description}>Для добавление ингредиента в коризну, перетащите его вправо</p>
        </section>
    ) : (
        <p>Произошла ошибка</p>
    );
};

export default IngredientDetails;
