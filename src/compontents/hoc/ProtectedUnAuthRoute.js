import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedUnAuthRoute = ({children}) => {
    const location = useLocation()
    const {isAuth} = useSelector((state => state.auth))
    return !isAuth ? <Navigate to='/' state={{from: location}}/> : children
};

export default ProtectedUnAuthRoute;
