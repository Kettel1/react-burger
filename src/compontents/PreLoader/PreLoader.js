import React from 'react';
import preLoaderStyles from './PreLoader.module.scss'

const PreLoader = () => {

    return (
        <div className={preLoaderStyles.container}>
            <div className={preLoaderStyles.ldsDefault}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default PreLoader;
