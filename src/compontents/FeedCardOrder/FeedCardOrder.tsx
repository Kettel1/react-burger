import React, {FC} from 'react';
import FeedCardStyles from './FeedCardOrder.module.scss'

const FeedCardOrder: FC = () => {
    const status = null

    return (
        <section className={FeedCardStyles.container}>
            <div className={FeedCardStyles.firstFloor}>
                <p className={FeedCardStyles.id}>#0343433</p>
                <time className={FeedCardStyles.time}>Сегодня, 16:20</time>
            </div>
            <h2 className={FeedCardStyles.name}>Interstallar бургер</h2>

            {status && <p className={FeedCardStyles.status}>Создан</p>}

            <div className={FeedCardStyles.lastFloor}>
                <ul className={FeedCardStyles.list}>
                    <li className={FeedCardStyles.item}>
                        <img src='https://via.placeholder.com/56x56/8555AD'/>
                    </li>
                </ul>

                <p className={FeedCardStyles.price}>480</p>
            </div>

        </section>
    );
};

export default FeedCardOrder;
