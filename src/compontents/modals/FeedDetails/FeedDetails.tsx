import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "../../../services/hooks";
import {getOrdersById} from "../../../services/selectors/ingredientsSelectors";


const IngredientDetails: FC = () => {
    const {id} = useParams()

    const currentOrder = useSelector(state => getOrdersById(state.allFeed.orders, id))

    useEffect(() => {
        console.log(currentOrder);
    }, [])

    return (
        <div>Test {id}</div>
    )
};


export default IngredientDetails;
