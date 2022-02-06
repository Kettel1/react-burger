import React, { FC } from 'react';
import preLoaderStyles from './PreLoader.module.scss';

const PreLoader: FC = () => {
    return (
        <div className={preLoaderStyles.container}>
            <div className={preLoaderStyles.ldsDefault}>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};

export default PreLoader;
