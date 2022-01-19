import React, {FC, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import ModalStyles from "./Modal.module.scss";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {CSSTransition} from "react-transition-group";

interface IModal {
    onCloseModal: () => void
}

const Modal:FC<IModal> = ({children, onCloseModal}) => {
    const [containerState, setContainerState] = useState(false)
    const [modalOverlayState, setModalOverlayState] = useState(false)
    const portalDiv = document.getElementById('modals')!

    const closeModal = () => {
        setContainerState(false)
        setModalOverlayState(false)

        // Таймаут для корректной работы анимации
        setTimeout(() => {
            onCloseModal()
        }, 200)
    }

    useEffect(() => {
        setContainerState(true)
        setModalOverlayState(true)
    }, [])


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const escFunction = (e:KeyboardEvent) => {
        const escape = 27
        if (e.keyCode === escape) {
            closeModal()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", escFunction);

        return () => {
            document.removeEventListener("keydown", escFunction);
        }
    }, [escFunction])

    return ReactDOM.createPortal(
        <>
            <CSSTransition in={containerState} timeout={200} classNames={{
                enterActive: ModalStyles.containerEnterActive,
                enterDone: ModalStyles.containerEnterDone,
                exitActive: ModalStyles.containerExitActive,
                exitDone: ModalStyles.containerExitDone,
            }}>
                <div className={ModalStyles.startAnimContainer}>
                    {children}
                    <CloseIcon onClick={closeModal} type="primary"/>
                </div>
            </CSSTransition>
            <CSSTransition in={modalOverlayState} timeout={200} classNames={{
                enterActive: ModalStyles.modalInnerEnterActive,
                enterDone: ModalStyles.modalInnerEnterDone,
                exitActive: ModalStyles.modalInnerExitActive,
                exitDone: ModalStyles.modalInnerExitDone,
            }}>
                <ModalOverlay onClose={closeModal}/>
            </CSSTransition>
        </>, portalDiv
    );
};


export default Modal;
