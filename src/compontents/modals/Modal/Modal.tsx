import React, {FC, useEffect, useState} from 'react';
import {createPortal} from "react-dom";
import ModalStyles from "./Modal.module.scss";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {CSSTransition} from "react-transition-group";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../services/reducers";
import { deleteAllIngredientsFromCart } from '../../../services/reducers/burgerCounstructor';

interface IModal {
    onCloseModal: () => void
}

const Modal: FC<IModal> = ({children, onCloseModal}) => {
    const [containerState, setContainerState] = useState(false)
    const portalDiv = document.getElementById('modals')!
    const nodeRef = React.useRef(null)
    const orderState = useSelector((state:RootState) => state.order)
    const dispatch = useDispatch()

    const closeModal = () => {
        setContainerState(false)

        // Таймаут для корректной работы анимации
        setTimeout(() => {
            if(orderState.orderSuccess) {
                dispatch(deleteAllIngredientsFromCart())
            }
            onCloseModal()
        }, 200)
    }

    useEffect(() => {
        setContainerState(true)
    }, [])


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const escFunction = (e: KeyboardEvent) => {
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

    return createPortal(
        <>
            <CSSTransition nodeRef={nodeRef} in={containerState} timeout={200} classNames={{
                enterActive: ModalStyles.containerEnterActive,
                enterDone: ModalStyles.containerEnterDone,
                exitActive: ModalStyles.containerExitActive,
                exitDone: ModalStyles.containerExitDone,
            }}>
                <div ref={nodeRef} className={ModalStyles.startAnimContainer}>
                    {children}
                    <CloseIcon onClick={closeModal} type="primary"/>
                </div>
            </CSSTransition>

            <ModalOverlay onClose={closeModal}/>

        </>, portalDiv
    );
};


export default Modal;
