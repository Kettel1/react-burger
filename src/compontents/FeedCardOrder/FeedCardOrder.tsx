import React, {FC} from 'react';
import FeedCardStyles from './FeedCardOrder.module.scss'
import moment from 'moment';
import "moment/locale/ru"
import {useSelector} from "../../services/hooks";
import {
    getMobileImagesById,
    getPriceIngredientsById,
    getTotalSumIngredients
} from "../../services/selectors/ingredientsSelectors";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from "react-router-dom";

interface IFeedCardOrder {
    readonly time: string,
    readonly name: string,
    readonly ingredients: Array<string>
    readonly orderNumber: number
    readonly status?: string | null,
    readonly id: string
}

interface IFeedCardImages {
    readonly images: Array<string>
}

const FeedCardImages: FC<IFeedCardImages> = ({images}) => {
    return (
        <>
            {images.slice(0, 6).map((item, index) => {
                if (index < 5) {
                    return <li key={item} style={{zIndex: images.length - index}} className={FeedCardStyles.item}>
                        <img className={FeedCardStyles.image}
                             style={{zIndex: images.length - index}}
                             src={item}
                             alt={'ингредиент'}
                        />
                    </li>
                } else {
                    return <li key={item} style={{zIndex: images.length - index, borderColor: '#5644F2'}}
                               className={FeedCardStyles.item}
                    >
                        <img className={FeedCardStyles.image}
                             style={{zIndex: images.length - index, opacity: 0.5}}
                             src={item}
                             alt={'ингредиент'}/>
                        <p className={FeedCardStyles.countIngredient}>+{images.length - index}</p>
                    </li>
                }
            })}
        </>
    )
}

const FeedCardOrder: FC<IFeedCardOrder> = ({time, name, ingredients, orderNumber, id, status = null}) => {

    let location = useLocation();

    const getMobileImages = useSelector(state => getMobileImagesById(state, ingredients))

    const getPriceIngredient = useSelector(state => getPriceIngredientsById(state, ingredients))

    const getTimeFromTimestamp = (orderTimeISO: string): string => {

        const orderDay = moment(orderTimeISO).format('DD')
        const orderTime = moment(orderTimeISO).format('HH:mm')
        const todayDay = moment().format('DD')

        const yesterdayMessageFromOrder = moment(orderTimeISO).fromNow();

        if (orderDay === todayDay) {
            return `сегодня, ${orderTime}`
        } else if (yesterdayMessageFromOrder === 'день назад') {
            return `вчера, ${orderTime}`;
        } else {
            return `${yesterdayMessageFromOrder}, ${orderTime}`
        }
    };

    return (
        <article className={FeedCardStyles.container}>
            <div className={FeedCardStyles.firstFloor}>
                <Link
                    className={FeedCardStyles.link}
                    to={`/feed/${id}`}
                    state={{backgroundLocation: location}}
                >
                    <span className={FeedCardStyles.id}>{'#03' + orderNumber}</span>
                </Link>
                <time dateTime={time} className={FeedCardStyles.time}>{getTimeFromTimestamp(time)}</time>
            </div>
            <h2 className={FeedCardStyles.name}>{name}</h2>
            {
                status && <p className={FeedCardStyles.status}>Создан</p>
            }

            <div className={FeedCardStyles.lastFloor}>
                <ul className={FeedCardStyles.list}>
                    <FeedCardImages images={getMobileImages}/>
                </ul>
                <p className={FeedCardStyles.price}>
                    <span>{getTotalSumIngredients(getPriceIngredient)}</span>
                    <span><CurrencyIcon type="primary"/></span>
                </p>
            </div>

        </article>
    )
        ;
};

export default FeedCardOrder;