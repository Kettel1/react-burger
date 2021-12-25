import React from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";

const Ingredients = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const id = useParams().id

    return (
        <div>
            Test
        </div>
    );
};

export default Ingredients;
