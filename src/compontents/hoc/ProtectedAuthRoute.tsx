import React, { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

interface IProtectedUnAuthRouteProps {
    children: ReactElement;
}

const ProtectedUnAuthRoute: FC<IProtectedUnAuthRouteProps> = ({ children }) => {
    const location = useLocation();
    const { isAuth } = useSelector((state) => state.auth);
    return isAuth ? <Navigate to="/" state={{ from: location }} /> : children;
};

export default ProtectedUnAuthRoute;
