import React, {useEffect, useState} from 'react';
import AppHeader from "../../compontents/AppHeader/AppHeader";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Login from '../../pages/Login'
import HomePage from "../../pages/HomePage";
import ForgotPassword from "../../pages/ForgotPassword";
import Register from "../../pages/Register";
import ResetPassword from "../../pages/ResetPassowrd";
import Profile from "../../pages/Profile";
import {getUserInfo} from "../../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import UserProfile from "../../pages/UserProfile";
import ProtectedUnAuthRoute from "../hoc/ProtectedUnAuthRoute";
import ProtectedAuthRoute from "../hoc/ProtectedAuthRoute";
import Ingredients from "../../pages/Ingredients";
import {fetchIngredients} from "../../services/actions/burgerIngredients";
import IngredientDetails from "../modals/IngredientsDetails/IngredientDetails";
import Modal from "../modals/Modal/Modal";
import OrderDetails from "../modals/OrderDetails/OrderDetails";
import PreLoader from "../PreLoader/PreLoader";
import {SET_INITIAL_ORDER_STATE} from "../../services/actions/order";

function App() {
    const location = useLocation();
    const dispatch = useDispatch()
    const {isLoading} = useSelector((state => state.auth))
    const {ingredients} = useSelector((state => state.ingredients))
    const navigate = useNavigate();
    const state = location.state

    useEffect(() => {
        dispatch(getUserInfo())
        dispatch(fetchIngredients())
    }, [dispatch])

    if (isLoading && !ingredients.ingredientsRequest) return (<PreLoader/>)

    return (
        <>
            <AppHeader/>
            <Routes location={state?.backgroundLocation || location}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/ingredients/:id' element={<Ingredients/>}/>
                <Route path='/ingredients/:id' element={<Ingredients/>}/>

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
                </Route>
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route
                        path='/ingredients/:id'
                        element={
                            <Modal onCloseModal={() => {
                                navigate('/')
                            }
                            }>
                                <IngredientDetails/>
                            </Modal>
                        }
                    />
                </Routes>
            )}

            {state?.backgroundLocation &&
            (<Routes>
                    <Route
                        path='/order/:orderNumber'
                        element={
                            <Modal onCloseModal={() => {
                                dispatch({type: SET_INITIAL_ORDER_STATE})
                                navigate('/')
                            }
                            }>
                                <OrderDetails/>
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
