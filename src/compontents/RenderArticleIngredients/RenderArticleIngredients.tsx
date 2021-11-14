import React from 'react';
import ingredientsTypes from '../../utils/types'
import PropTypes from "prop-types";
import ArticleIngredients from './RenderArticleIngredients.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../modals/Modal/Modal';


// @ts-ignore
const RenderArticleIngredients = ({item}) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }


    // @ts-ignore
    return <>
        <article onClick={toggleModal} className={ArticleIngredients.ingredientsBlockInner}>
            <img src={item.image} alt={item.name}/>
            <div className={ArticleIngredients.priceBlock}>
                <span className={ArticleIngredients.priceValue}>{item.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={ArticleIngredients.name}>{item.name}</p>
        </article>
        <Modal
               open={isOpen}
               onClose={() => setIsOpen(false)}
               ingredientInfo={item}
               type={'ingredient'}
        />
    </>

}

RenderArticleIngredients.propTypes = {
    item: PropTypes.shape({
        ingredientsTypes
    }).isRequired
}

export default RenderArticleIngredients;
