import React from 'react';
import BurgerConstructorStyles from "../BurgerConstructor/BurgerConstructor.module.scss";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import {useDrag, useDrop} from "react-dnd";
import {DELETE_INGREDIENTS_FROM_CART} from "../../services/actions/BurgerCounstructor";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import ingredientsTypes from '../../utils/types'

const IngredientConstructorItem = ({id, item, idx, moveCard}) => {
    const dispatch = useDispatch()

    const dragDropRef = React.useRef(null)

    const [{handlerId}, drop] = useDrop({
        accept: 'item',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover: (item, monitor) => {
            if(!dragDropRef.current) {
                return
            }

            const dragIndex = item.idx
            const hoverIndex = idx

            if(dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = dragDropRef.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex)
            item.idx = hoverIndex
        },
    })

    const [{isDragging}, drag] = useDrag({
        type: 'item',
        item: () => {
            return {id, idx}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const deleteFromCart = (id) => {
        dispatch({type: DELETE_INGREDIENTS_FROM_CART, id})
    }

    drag(drop(dragDropRef))

    return <li
        className={BurgerConstructorStyles.item}
        ref={dragDropRef}
        data-handler-id={handlerId}
        style={{opacity: isDragging ? 0 : 1}}>
        <DragIcon type={"primary"}/>
        <ConstructorElement
            handleClose={() => deleteFromCart(item._id + idx)}
            text={item.name}
            price={item.price}
            thumbnail={item.image_mobile}
            moveListItem={moveCard}/>
    </li>
};

IngredientConstructorItem.propTypes = {
    item: PropTypes.shape({
        ingredientsTypes
    }).isRequired,
    id: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired
}

export default IngredientConstructorItem;
