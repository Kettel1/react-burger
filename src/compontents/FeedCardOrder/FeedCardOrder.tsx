import React, {FC} from 'react';
import FeedCardStyles from './FeedCardOrder.module.scss'
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import "moment/locale/ru"
import {useSelector} from "../../services/hooks";
import {getMobileImagesById} from "../../services/selectors/ingredientsSelectors";

interface IFeedCardOrder {
    time: string,
    name: string,
    ingredients: Array<string>
    orderNumber: number
    status?: string | null,
}

// {time, name, ingredients, status = null}

const FeedCardOrder: FC<IFeedCardOrder>= ({time, name, ingredients,orderNumber, status = null}) => {

    const getMobileImages = useSelector(state => getMobileImagesById(state, ingredients))

    const getTimeFromTimestamp = (timestamp:any):any => {
        const orderDay = moment(timestamp).format('DD')
        const orderTime = moment(timestamp).format('HH:mm')
        const todayDay = moment().format('DD')

        const yesterdayMessage = moment(timestamp).fromNow();

        if(orderDay === todayDay) {
            return('сегодня, ' + orderTime)
        } else if(yesterdayMessage === 'день назад') {
            return 'вчера, ' + orderTime;
        } else {
            return yesterdayMessage + ", " +  orderTime
        }
    };



    return (
        <article className={FeedCardStyles.container}>
            <div className={FeedCardStyles.firstFloor}>
                <p className={FeedCardStyles.id}>{'#03' + orderNumber}</p>
                <time className={FeedCardStyles.time}>{getTimeFromTimestamp(time)}</time>
            </div>
            <h2 className={FeedCardStyles.name}>{name}</h2>

            {status && <p className={FeedCardStyles.status}>Создан</p>}

            <div className={FeedCardStyles.lastFloor}>
                <ul className={FeedCardStyles.list}>
                    {getMobileImages.map((item, index) => {
                        return <li style={{zIndex: getMobileImages.length - index}} className={FeedCardStyles.item}>
                            <img className={FeedCardStyles.image} style={{zIndex: getMobileImages.length - index}} src={item}/>
                        </li>
                    })}
                </ul>

                <p className={FeedCardStyles.price}>480</p>
            </div>

        </article>
    );
};

export default FeedCardOrder;
