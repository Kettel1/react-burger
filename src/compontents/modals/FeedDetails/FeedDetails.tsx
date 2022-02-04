import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "../../../services/hooks";
import {
    getAmountByIngredientsId,
    getOrdersById,
    getArrayIngredientsById,
} from "../../../services/selectors/ingredientsSelectors";

import FeedDetailsStyles from './FeedDetails.module.scss'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {getTimeFromTimestamp} from "../../../services/helpers";
import {IIngredient} from "../../../types/ingredientTypes";

//TODO Типизировать
const FeedDetails: FC<{ orders?: any }> = ({orders}) => {

    const {id} = useParams()
    let currentIngredient;
    //TODO Типизация
    const feedState = useSelector(state => state.allFeed.orders);

    const ingredientsState = useSelector(state => state);

    if (orders) {
        currentIngredient = getOrdersById(orders, id);
    } else {
        currentIngredient = getOrdersById(feedState, id);
    }

    if (!currentIngredient?._id.length) {
        return <div>Загрузка...</div>
    }

    const {number, name, status, ingredients, createdAt} = currentIngredient;

    const priceAllIngredientsInOrders = getAmountByIngredientsId(ingredientsState, ingredients);

    const arrayIngredientsInOrder = getArrayIngredientsById(ingredientsState, ingredients)

    return (
        <section className={FeedDetailsStyles.container}>
            <div className={FeedDetailsStyles.innerContainer}>
                <div className={FeedDetailsStyles.header}>
                    <p className={FeedDetailsStyles.id}>{'#03' + number}</p>

                    <p className={FeedDetailsStyles.name}>{name}</p>

                    <p className={FeedDetailsStyles.status}>{status === 'done' ? 'Выполнен' : 'В процессе'}</p>

                    <p className={FeedDetailsStyles.composition}>Состав:</p>
                </div>

                <ul className={FeedDetailsStyles.ingredientsList}>
                    {arrayIngredientsInOrder.map((item: IIngredient) =>
                        <li
                            className={FeedDetailsStyles.ingredientsItem}
                            key={item._id}>
                            <div className={FeedDetailsStyles.ingredientsImageContainer}>
                                <img src={item.image_mobile} alt={item.name}/>
                            </div>
                            <p className={FeedDetailsStyles.ingredientsName}>{item.name}</p>
                            <div className={FeedDetailsStyles.ingredientsPriceContainer}>
                                <p>1 x {item.price}</p>
                                <CurrencyIcon type={"primary"}/>
                            </div>
                        </li>
                    )}
                </ul>

                <div className={FeedDetailsStyles.footer}>
                    <time className={FeedDetailsStyles.time}
                          dateTime={createdAt}>{getTimeFromTimestamp(createdAt)}</time>
                    <div className={FeedDetailsStyles.priceContainer}>
                        <p>{priceAllIngredientsInOrders}</p>
                        <CurrencyIcon type={"primary"}/>
                    </div>
                </div>

            </div>
        </section>
    )
};


export default FeedDetails;
