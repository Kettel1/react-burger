import React from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";


const Modal = ({children, onCloseModal}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const onClose = () => {
    //     navigate('/')
    //     dispatch({type: SET_INITIAL_ORDER_STATE})
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const escFunction = (e) => {
        if (e.keyCode === 27) {
            onCloseModal()
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", escFunction);

        return () => {
            document.removeEventListener("keydown", escFunction);
        }
    }, [escFunction])

    return ReactDOM.createPortal(
        <ModalOverlay onClose={onCloseModal}>
            <CloseIcon onClick={onCloseModal} type="primary"/>
            {children}
        </ModalOverlay>, document.getElementById('modals')
    );
};

Modal.propTypes = {
    children: PropTypes.element
}

export default Modal;
