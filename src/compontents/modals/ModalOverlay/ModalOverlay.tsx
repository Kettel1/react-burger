import React, {FC, SyntheticEvent} from 'react';
import ModalStyles from './ModalOverlay.module.scss'
import PropTypes from "prop-types";

interface IModalOverlay {
    onClose: () => void
}

const ModalOverlay:FC<IModalOverlay> = ({onClose}) => {
    const closeModal = (e:SyntheticEvent) => {
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


