import React, {VFC} from 'react';
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import styles from "./BurgerIngredientsSkeleton.module.scss";


const BurgerIngredientsSkeleton:VFC = () => {
    return (
        <div className={styles.container}>
            <Skeleton
                width={330}
                height={35}
                baseColor="#2F2F37"
                highlightColor="#8585AD"
            />

            <ul className={styles.list}>
                <li>
                    <Skeleton
                        width={50}
                        height={15}
                        baseColor="#2F2F37"
                        highlightColor="#8585AD"
                    />
                </li>
                <li>
                    <Skeleton
                        width={50}
                        height={15}
                        baseColor="#2F2F37"
                        highlightColor="#8585AD"
                    />
                </li>
                <li>
                    <Skeleton
                        width={50}
                        height={15}
                        baseColor="#2F2F37"
                        highlightColor="#8585AD"
                    />
                </li>
            </ul>

            <div className={styles.goodContainer}>
                <SkeletonTheme
                    baseColor="#2F2F37"
                    highlightColor="#8585AD">
                    <h1 className={styles.goodTitle}>
                        <Skeleton
                        width={100}
                        height={30}
                    />
                    </h1>

                    <div className={styles.goodInnerContainer}>

                        <article className={styles.goodInner}>
                            <Skeleton
                                width={260}
                                height={120}
                            />
                            <div className={styles.price}>
                                <Skeleton
                                    width={65}
                                    height={22}

                                />
                                <Skeleton
                                    width={26}
                                    height={22}

                                />
                            </div>
                            <div className={styles.name}>
                                <Skeleton
                                    width={257}
                                    height={22}

                                />
                            </div>
                        </article>
                        <article className={styles.goodInner}>
                            <Skeleton
                                width={260}
                                height={120}
                            />

                            <div className={styles.price}>
                                <Skeleton
                                    width={65}
                                    height={22}
                                />
                                <Skeleton
                                    width={26}
                                    height={22}
                                />
                            </div>
                            <div className={styles.name}>
                                <Skeleton
                                    width={257}
                                    height={22}
                                />
                            </div>
                        </article>
                    </div>
                </SkeletonTheme>
            </div>

            <div className={styles.goodContainer}>
                <SkeletonTheme
                    baseColor="#2F2F37"
                    highlightColor="#8585AD">
                    <h1 className={styles.goodTitle}>
                        <Skeleton
                            width={100}
                            height={30}
                        />
                    </h1>
                    <div className={styles.goodInnerContainer}>

                        <article className={styles.goodInner}>
                            <Skeleton
                                width={260}
                                height={120}
                            />
                            <div className={styles.price}>
                                <Skeleton
                                    width={65}
                                    height={22}

                                />
                                <Skeleton
                                    width={26}
                                    height={22}

                                />
                            </div>
                            <div className={styles.name}>
                                <Skeleton
                                    width={257}
                                    height={22}

                                />
                            </div>
                        </article>
                        <article className={styles.goodInner}>
                            <Skeleton
                                width={260}
                                height={120}
                            />

                            <div className={styles.price}>
                                <Skeleton
                                    width={65}
                                    height={22}
                                />
                                <Skeleton
                                    width={26}
                                    height={22}
                                />
                            </div>
                            <div className={styles.name}>
                                <Skeleton
                                    width={257}
                                    height={22}
                                />
                            </div>
                        </article>

                    </div>
                </SkeletonTheme>
            </div>
        </div>
    );
};

export default BurgerIngredientsSkeleton;
