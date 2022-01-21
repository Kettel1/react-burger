import React, {useRef, FC} from 'react';
import BurgerConstructorStyles from "../BurgerConstructor/BurgerConstructor.module.scss";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {useDispatch} from "react-redux";
import {IIngredient} from "../../types/ingredientTypes";
import {deleteIngredientFromCart} from "../../services/reducers/burgerCounstructor";

interface IIngredientConstructorItemProps {
    id: string,
    item: IIngredient,
    idx: number,
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

const IngredientConstructorItem: FC<IIngredientConstructorItemProps> = ({id, item, idx, moveCard}) => {
    const dispatch = useDispatch()

    const dragDropRef = useRef<HTMLLIElement>(null)

    const [{handlerId}, drop] = useDrop({
        accept: 'item',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        hover: (item: IIngredient, monitor) => {
            if (!dragDropRef.current) {
                return
            }

            const dragIndex:number | undefined = item.idx

            const hoverIndex = idx

            if (dragIndex === hoverIndex) {
                return
            }


            const hoverBoundingRect = dragDropRef.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if(dragIndex) {
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
            }


            if (dragIndex != null) {
                moveCard(dragIndex, hoverIndex)
            }

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

    const deleteFromCart = (id: string): void => {
        dispatch(deleteIngredientFromCart(id))
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
        />
    </li>
};


export default IngredientConstructorItem;
