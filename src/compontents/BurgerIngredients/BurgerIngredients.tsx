import {CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
// @ts-ignore
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import RenderBurgerIngredients from '../RenderBurgerIngredients/RenderBurgerIngredients';
import PropTypes from "prop-types";

// @ts-ignore
const BurgerIngredients = (props) => {


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
                <RenderBurgerIngredients data={props.data} type={'bun'}/>
                <RenderBurgerIngredients data={props.data} type={'sauce'}/>
                <RenderBurgerIngredients data={props.data} type={'main'}/>
            </div>
        </section>
    );
};

BurgerIngredients.propType = {
    id: PropTypes.string,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string
}

export default BurgerIngredients;
