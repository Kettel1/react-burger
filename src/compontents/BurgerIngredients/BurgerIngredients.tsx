import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useCallback, useRef, useState } from 'react';
import BurgerIngredientsStyles from './BurgerIngredients.module.scss';
import RenderBurgerIngredients from '../RenderBurgerIngredients/RenderBurgerIngredients';
import { debounce } from '../../services/helpers';

const BurgerIngredients: FC = () => {
    const [currentTab, setCurrentTab] = useState<'one' | 'two' | 'three'>('one');
    const bunRef = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
    const sauceRef = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
    const mainRef = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
    const scrollRef = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;

    const scrollToRef = useCallback(
        (value: string): void => {
            switch (value) {
                case 'one': {
                    bunRef.current.scrollIntoView({
                        behavior: 'smooth',
                    });
                    break;
                }
                case 'two': {
                    sauceRef.current.scrollIntoView({
                        behavior: 'smooth',
                    });
                    break;
                }
                case 'three': {
                    mainRef.current.scrollIntoView({
                        behavior: 'smooth',
                    });
                    break;
                }
            }
        },
        [bunRef, sauceRef, mainRef]
    );

    const setCurrentTabFromHeight = (): void => {
        const currentHeight = scrollRef.current.scrollTop;

        if (currentHeight < 300) {
            setCurrentTab('one');
        }

        if (currentHeight >= 290 && currentHeight <= 800) {
            setCurrentTab('two');
        }

        if (currentHeight > 790) {
            setCurrentTab('three');
        }
    };

    function ingredientsTabs() {
        return (
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={currentTab === 'one'} onClick={scrollToRef}>
                    Булки
                </Tab>
                <Tab value="two" active={currentTab === 'two'} onClick={scrollToRef}>
                    Соусы
                </Tab>
                <Tab value="three" active={currentTab === 'three'} onClick={scrollToRef}>
                    Начинки
                </Tab>
            </div>
        );
    }

    return (
        <section className={BurgerIngredientsStyles.container}>
            <h1 className={BurgerIngredientsStyles.title}>Соберите бургер</h1>
            {ingredientsTabs()}
            <div
                className={BurgerIngredientsStyles.scrollBar}
                ref={scrollRef}
                onScroll={debounce(setCurrentTabFromHeight, 100)}
            >
                <RenderBurgerIngredients type={'bun'} ref={bunRef} />
                <RenderBurgerIngredients type={'sauce'} ref={sauceRef} />
                <RenderBurgerIngredients type={'main'} ref={mainRef} />
            </div>
        </section>
    );
};

export default BurgerIngredients;
