import React from 'react';
import preLoaderStyles from './PreLoader.module.scss'

const PreLoader = () => {
    const test = preLoaderStyles.ldsDefault
    return (
        <div className={test}>
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
    );
};

export default PreLoader;
