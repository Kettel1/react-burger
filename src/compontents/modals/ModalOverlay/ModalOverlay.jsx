import React from 'react';
import ModalStyles from './ModalOverlay.module.scss'
import PropTypes from "prop-types";

const ModalOverlay = ({onClose}) => {
    const closeModal = (e) => {
        e.stopPropagation()
        onClose()
    }
    return (
        <div className={ModalStyles.modalInner} onClick={closeModal}/>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;


