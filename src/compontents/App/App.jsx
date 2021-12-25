import React from 'react';
import AppHeader from "../../compontents/AppHeader/AppHeader";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from '../../pages/Login'
import HomePage from "../../pages/HomePage";
import ForgotPassword from "../../pages/ForgotPassword";
import Register from "../../pages/Register";
import ResetPassword from "../../pages/ResetPassowrd";
import Profile from "../../pages/Profile";
import {getUserInfo} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import UserProfile from "../../pages/UserProfile";
import Orders from "../../pages/Orders";
import ProtectedUnAuthRoute from "../hoc/ProtectedUnAuthRoute";
import ProtectedAuthRoute from "../hoc/ProtectedAuthRoute";
import Ingredients from "../../pages/Ingredients";


function App() {
    const dispatch = useDispatch()
    const {isLoading} = useSelector((state => state.auth))

    React.useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])

    if(isLoading) return (<div>Загрузка</div>)

    // Нужно закончить еще 7 пункт, проверьте пожалуйста это
    // Я как раз исправлю замечаения и закончу 7 пункт, а то боюсь не успеть

    return (
        <Router>
            <AppHeader/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/ingredient/:id' element={<Ingredients/>}/>

                <Route path='/login' element={
                    <ProtectedAuthRoute>
                        <Login/>
                    </ProtectedAuthRoute>}/>
                <Route path='/reset-password' element={
                    <ProtectedAuthRoute>
                        <ResetPassword/>
                    </ProtectedAuthRoute>
                }/>
                <Route path='/register' element={
                    <ProtectedAuthRoute>
                        <Register/>
                    </ProtectedAuthRoute>
                }/>
                <Route path='/forgot-password' element={
                    <ProtectedAuthRoute>
                        <ForgotPassword/>
                    </ProtectedAuthRoute>
                }/>
                <Route path='/profile/*' element={
                    <ProtectedUnAuthRoute>
                        <Profile/>
                    </ProtectedUnAuthRoute>}>
                    <Route path='' element={<UserProfile/>}/>
                    <Route path='orders' element={<Orders/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
