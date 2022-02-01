import React, {FC, useEffect} from 'react';
import FeedStyles from './Feed.module.scss'
import FeedCardOrder from "../compontents/FeedCardOrder/FeedCardOrder";
import {useDispatch, useSelector} from "../services/hooks";
import {getIngredientsById} from "../services/selectors/ingredientsSelectors";


type TOrderStatus = 'done' | 'inProcess'

const Feed: FC = () => {

    const dispatch = useDispatch()

    const id = useSelector(state => getIngredientsById(state, '60d3b41abdacab0026a733c6'))

    const {totalToday, total, orders, success} = useSelector(state => state.allFeed)

    useEffect(() => {
        dispatch({type: 'WS_CONNECTION_START'})
        console.log(id);
        return () => {
            dispatch({type: 'WS_CONNECTION_CLOSED'})
        }
    }, [])


    const getOrdersNumbersByStatus = (orders: any, orderStatus: TOrderStatus): Array<string> => {
        const sortedOrders = orders.filter((item: any) => item.status === orderStatus)
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
                {orders.map((item:any) =>
                    <FeedCardOrder
                        key={item._id}
                        time={item.createdAt}
                        name={item.name}
                        orderNumber={item.number}
                        ingredients={item.ingredients}/>
                )}

            </div>

            <div className={FeedStyles.ordersStatus}>

                <div className={FeedStyles.ordersStatusDone}>
                    <p className={FeedStyles.ordersStatusTitle}>Готовы:</p>
                    <ul className={FeedStyles.ordersStatusDoneList}>
                        {getOrdersNumbersByStatus(orders, 'done').length
                            ? getOrdersNumbersByStatus(orders, 'done').map((item) =>
                                <li key={item} className={FeedStyles.orderStatusDoneItem}>{item}</li>)
                            : <div>Здесь пусто...</div>
                        }
                    </ul>
                </div>

                <div className={FeedStyles.ordersStatusDone}>
                    <p className={FeedStyles.ordersStatusTitle}>В работе:</p>
                    <ul className={FeedStyles.ordersStatusDoneList}>
                        {getOrdersNumbersByStatus(orders, 'inProcess').length
                            ? getOrdersNumbersByStatus(orders, 'inProcess').map((item) =>
                                <li key={item} className={FeedStyles.orderStatusDoneItem}>{item}</li>)
                            : <div>Здесь пусто...</div>
                        }
                    </ul>
                </div>

                <div className={FeedStyles.orderTotalContainer}>
                    <h3 className={FeedStyles.orderTotalTitle}>Выполнено за все время</h3>
                    <p className={FeedStyles.orderTotalQty}>{total}</p>
                </div>

                <div className={FeedStyles.orderTotalContainer}>
                    <h3 className={FeedStyles.orderTotalTitle}>Выполнено за сегодня</h3>
                    <p className={FeedStyles.orderTotalQty}>{totalToday}</p>
                </div>
            </div>


        </section>
    )
};

export default Feed;
