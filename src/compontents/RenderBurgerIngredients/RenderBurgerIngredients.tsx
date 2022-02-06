import React, { forwardRef } from 'react';
import BurgerIngredientsStyles from './RenderBurgerIngredients.module.scss';
import RenderArticleIngredients from '../RenderArticleIngredients/RenderArticleIngredients';
import { IIngredient } from '../../types/ingredientTypes';
import { useSelector } from '../../services/hooks';

interface IRenderBurgerIngredientsProps {
    type: 'bun' | 'main' | 'sauce';
}

const RenderBurgerIngredients = forwardRef<HTMLDivElement, IRenderBurgerIngredientsProps>((props, ref) => {
    const { ingredients } = useSelector((state) => state.ingredients);

    const getTitleName = (propType: string): string => {
        switch (propType) {
            case 'bun':
                return 'Булки';
            case 'main':
                return 'Начинки';
            case 'sauce':
                return 'Соусы';
            default:
                return 'Неизвестная начинка';
        }
    };

    return (
        <div ref={ref} className={BurgerIngredientsStyles.ingredientsContainer}>
            <h2 className={BurgerIngredientsStyles.title}>{getTitleName(props.type)}</h2>
            <div className={BurgerIngredientsStyles.ingredientsBlock}>
                {ingredients.map(
                    (item: IIngredient) =>
                        item.type === props.type && <RenderArticleIngredients item={item} key={item._id} />
                )}
            </div>
        </div>
    );
});

export default RenderBurgerIngredients;
