import React, {FC, useEffect} from 'react';
import FeedStyles from './Feed.module.scss'
import FeedCardOrder from "../compontents/FeedCardOrder/FeedCardOrder";
import {useDispatch, useSelector} from "../services/hooks";


type statusOrder = 'done' | 'inProcess'

const Feed: FC = () => {

    const dispatch = useDispatch()

    const {totalToday, total, orders, success} = useSelector(state => state.allFeed)

    useEffect(() => {
        dispatch({type: 'WS_CONNECTION_START'})
        return () => {
            dispatch({type: 'WS_CONNECTION_CLOSED'})
        }
    }, [])


    const getOrdersNumbersByStatus = (orders: any, statusOrder: statusOrder): Array<string> => {
        const sortedOrders = orders.filter((item: any) => item.status === statusOrder)
        // По тз должно быть не больше 10 значений
        return sortedOrders.map((item: any) => '03' + item.number).slice(0, 10)
    }

    //TODO Сделать красивый прелодер
    if (!success) {
        return <div>Загрузка</div>
    }

    return (
        <section className={FeedStyles.container}>
            <div className={FeedStyles.ordersFeed}>
                <h1 className={FeedStyles.title}>Лента заказов</h1>
                <FeedCardOrder/>
            </div>

            <div className={FeedStyles.ordersStatus}>

                <div className={FeedStyles.ordersStatusDone}>
                    <p className={FeedStyles.ordersStatusTitle}>Готовы:</p>
                    <ul className={FeedStyles.ordersStatusDoneList}>
                        {getOrdersNumbersByStatus(orders, 'done').map((item) => {
                            return <li className={FeedStyles.orderStatusDoneItem}>{item}</li>
                        })}
                    </ul>
                </div>
                <div>
                    <p>В работе:</p>
                    <ul>
                        <li>
                            1
                        </li>
                        <li>
                            2
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
};

export default Feed;
