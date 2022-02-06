import React, { FC } from 'react';
import FeedCardStyles from './FeedCardOrder.module.scss';
import 'moment/locale/ru';
import { useSelector } from '../../services/hooks';
import {
    getMobileImagesById,
    getArrayIngredientsById,
    getTotalSumIngredients,
} from '../../services/selectors/ingredientsSelectors';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { getTimeFromTimestamp } from '../../services/helpers';

interface IFeedCardOrder {
    readonly time: string | undefined;
    readonly name: string;
    readonly ingredients: Array<string>;
    readonly orderNumber: number;
    readonly status?: string | null;
    readonly id: string;
    readonly pageName: string | undefined;
}

interface IFeedCardImages {
    readonly images: Array<string>;
}

const FeedCardImages: FC<IFeedCardImages> = ({ images }) => {
    return (
        <>
            {images.slice(0, 6).map((item, index) => {
                if (index < 5) {
                    return (
                        <li key={index} style={{ zIndex: images.length - index }} className={FeedCardStyles.item}>
                            <img
                                className={FeedCardStyles.image}
                                style={{ zIndex: images.length - index }}
                                src={item}
                                alt={'ингредиент'}
                            />
                        </li>
                    );
                } else {
                    return (
                        <li
                            key={item}
                            style={{ zIndex: images.length - index, borderColor: '#5644F2' }}
                            className={FeedCardStyles.item}
                        >
                            <img
                                className={FeedCardStyles.image}
                                style={{ zIndex: images.length - index, opacity: 0.5 }}
                                src={item}
                                alt={'ингредиент'}
                            />
                            <p className={FeedCardStyles.countIngredient}>+{images.length - index}</p>
                        </li>
                    );
                }
            })}
        </>
    );
};

const FeedCardOrder: FC<IFeedCardOrder> = ({ time, name, ingredients, orderNumber, id, status = null, pageName }) => {
    let location = useLocation();

    const getMobileImages = useSelector((state) => getMobileImagesById(state, ingredients));

    const getArrayIngredients = useSelector((state) => getArrayIngredientsById(state, ingredients));

    let statusElem: string | undefined;
    switch (status) {
        case 'done':
            statusElem = 'Выполнен';
            break;
        case 'created':
            statusElem = 'Создан';
            break;
        case 'pending':
            statusElem = 'Готовится';
            break;
        default:
            statusElem = 'Статус заказа неизвестен...';
    }

    return (
        <article className={FeedCardStyles.container}>
            <div className={FeedCardStyles.firstFloor}>
                <Link
                    className={FeedCardStyles.link}
                    to={`/${pageName}/${id}`}
                    state={{ backgroundLocation: location.pathname }}
                >
                    <span className={FeedCardStyles.id}>{'#' + orderNumber}</span>
                </Link>
                <time dateTime={time} className={FeedCardStyles.time}>
                    {getTimeFromTimestamp(time)}
                </time>
            </div>
            <h2 className={FeedCardStyles.name}>{name}</h2>

            {status && (
                <p className={FeedCardStyles.status} datatype={status}>
                    {statusElem}
                </p>
            )}

            <div className={FeedCardStyles.lastFloor}>
                <ul className={FeedCardStyles.list}>
                    <FeedCardImages images={getMobileImages} />
                </ul>
                <p className={FeedCardStyles.price}>
                    <span>{getTotalSumIngredients(getArrayIngredients)}</span>
                    <span>
                        <CurrencyIcon type="primary" />
                    </span>
                </p>
            </div>
        </article>
    );
};

export default FeedCardOrder;
