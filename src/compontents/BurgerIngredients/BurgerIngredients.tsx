import {CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
// @ts-ignore
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import RenderBurgerIngredients from '../RenderBurgerIngredients/RenderBurgerIngredients';
import PropTypes from "prop-types";
import ingredientsTypes from '../../utils/types'

// @ts-ignore
const BurgerIngredients = ({ingredients}) => {


    function ingredientsTabs() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [current, setCurrent] = React.useState('one')
        return (
            <div style={{display: 'flex'}}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
        )
    }

    return (
        <section className={BurgerIngredientsStyles.container}>
            <h1 className={BurgerIngredientsStyles.title}>Соберите бургер</h1>
            {ingredientsTabs()}
            <div className={BurgerIngredientsStyles.scrollBar}>
                <RenderBurgerIngredients data={ingredients} type={'bun'}/>
                <RenderBurgerIngredients data={ingredients} type={'sauce'}/>
                <RenderBurgerIngredients data={ingredients} type={'main'}/>
            </div>
        </section>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsTypes.isRequired).isRequired
}



export default BurgerIngredients;
