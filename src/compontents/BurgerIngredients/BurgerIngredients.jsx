import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import BurgerIngredientsStyles from './BurgerIngredients.module.scss'
import RenderBurgerIngredients from '../RenderBurgerIngredients/RenderBurgerIngredients';
import PropTypes from "prop-types";
import ingredientsTypes from '../../utils/types'
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/actions/BurgerIngredients";

// @ts-ignore
const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = React.useState('one')
    const {ingredients} = useSelector(state => state.ingredients)


    function ingredientsTabs() {
        return (
            <div style={{display: 'flex'}}>
                <Tab value="one" active={currentTab === 'one'} onClick={setCurrentTab}>
                    Булки
                </Tab>
                <Tab value="two" active={currentTab === 'two'} onClick={setCurrentTab}>
                    Соусы
                </Tab>
                <Tab value="three" active={currentTab === 'three'} onClick={setCurrentTab}>
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
}


BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsTypes.isRequired).isRequired
}



export default BurgerIngredients;
