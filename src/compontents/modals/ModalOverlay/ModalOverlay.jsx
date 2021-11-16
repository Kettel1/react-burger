import React from 'react';
import ModalStyles from './ModalOverlay.module.css'
import PropTypes from "prop-types";


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

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.element)
}

export default ModalOverlay;


