import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "../../../services/hooks";
import {getOrdersById} from "../../../services/selectors/ingredientsSelectors";

import FeedDetailsStyles from './FeedDetails.module.scss'

//TODO Типизировать
const IngredientDetails: FC<{orders?:any}> = ({orders}) => {
    const {id} = useParams()

    //TODO Типизация
    const feedState = useSelector(state => state.allFeed.orders);

    let currentIngredient

    if(orders) {
        currentIngredient = getOrdersById(orders, id)
    } else {
        currentIngredient = getOrdersById(feedState, id)
    }

    if (!currentIngredient?._id.length) {
        return <div>Загрузка...</div>
    }

    const {number, name, status, ingredients, price, createdAt} = currentIngredient

    return (
        <section className={FeedDetailsStyles.container}>
            <div className={FeedDetailsStyles.innerContainer}>
                <p className={FeedDetailsStyles.id}>{'#03'+ number}</p>

                <p className={FeedDetailsStyles.name}>{name}</p>

                <p className={FeedDetailsStyles.status}>{status === 'done' ? 'Выполнен': 'В процессе'}</p>
            </div>
        </section>
    )
};


export default IngredientDetails;
