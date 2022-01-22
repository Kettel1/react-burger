import React, {ReactElement, FC} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../services/reducers";

interface IProtectedUnAuthRoute {
    children: ReactElement
}

const ProtectedUnAuthRoute:FC<IProtectedUnAuthRoute> = ({children}) => {
    const location = useLocation()
    const {isAuth} = useSelector((state:RootState) => state.auth)
    return !isAuth ? <Navigate to='/login' state={{from: location}}/> : children
};

export default ProtectedUnAuthRoute;
