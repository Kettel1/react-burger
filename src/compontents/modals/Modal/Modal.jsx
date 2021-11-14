import React from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientsDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import ModalStyles from "./Modal.module.css";

const Modal = ({open, onClose, ingredientInfo, type}) => {
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
        <ModalOverlay onClose={onClose} >
            <section className={type === 'ingredient' ? ModalStyles.modalContainerIngredients : ModalStyles.modalContainerOrder}>
                <h1 className={ModalStyles.header}>{type === 'ingredient' && 'Детали ингридиента'}</h1>
                {type === 'ingredient'
                    ?
                    <IngredientDetails ingredientsInfo={ingredientInfo} onClose={onClose}/>
                    :
                    <OrderDetails onClose={onClose}/>
                }
            </section>
        </ModalOverlay>, document.getElementById('modals')
    );
};

export default Modal;
