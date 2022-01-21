import React, {FC, SyntheticEvent} from 'react';
import ModalStyles from './ModalOverlay.module.scss'

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

export default ModalOverlay;


