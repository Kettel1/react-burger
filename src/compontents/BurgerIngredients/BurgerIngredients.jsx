import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import BurgerIngredientsStyles from './BurgerIngredients.module.scss'
import RenderBurgerIngredients from '../RenderBurgerIngredients/RenderBurgerIngredients';
import {useSelector} from "react-redux";


// @ts-ignore
const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = React.useState('one')
    const {ingredients} = useSelector((state => state.ingredients))
    const bunRef = React.useRef(null)
    const sauceRef = React.useRef(null)
    const mainRef = React.useRef(null)

    const scrollToRef = (ref) => {
        ref.current.scrollIntoView({
            behavior: "smooth"
        })
    }

    function ingredientsTabs() {
        return (
            <div style={{display: 'flex'}}>
                <Tab value="one" active={currentTab === 'one'} onClick={() => {
                    setCurrentTab('one')
                    scrollToRef(bunRef)
                }}>
                    Булки
                </Tab>
                <Tab value="two" active={currentTab === 'two'} onClick={() => {
                    setCurrentTab('two')
                    scrollToRef(sauceRef)
                }}>
                    Соусы
                </Tab>
                <Tab value="three" active={currentTab === 'three'} onClick={() => {
                    setCurrentTab('three')
                    scrollToRef(mainRef)
                }}>
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
                <RenderBurgerIngredients data={ingredients} type={'bun'} ref={bunRef}/>
                <RenderBurgerIngredients data={ingredients} type={'sauce'} ref={sauceRef}/>
                <RenderBurgerIngredients data={ingredients} type={'main'} ref={mainRef}/>
            </div>
        </section>
    );
}

export default BurgerIngredients;
