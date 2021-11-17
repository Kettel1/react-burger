import React from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Modal = ({open, onClose, children}) => {
    if (!open) return null

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const escFunction = (e) => {
        if (e.keyCode === 27) {
            onClose()
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
        document.addEventListener("keydown", escFunction);

        return () => {
            document.removeEventListener("keydown", escFunction);
        }
    }, [escFunction])

    return ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>
            <CloseIcon onClick={onClose} type="primary"/>
            {children}
        </ModalOverlay>, document.getElementById('modals')
    );
};

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element
}

export default Modal;
