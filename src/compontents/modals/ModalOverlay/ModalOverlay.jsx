import React from 'react';

import ModalStyles from './ModalOverlay.module.css'


// @ts-ignore
const ModalOverlay = ({children, onClose}) => {


    return (
        <div className={ModalStyles.fixedOverlay} onClick={onClose} >
            <div className={ModalStyles.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
export default ModalOverlay;


