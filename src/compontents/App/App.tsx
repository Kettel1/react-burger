import React, {useEffect, FC} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "../../services/hooks";
import {getUserInfo} from "../../services/actions/auth";
import {fetchIngredients} from "../../services/actions/burgerIngredients";
import {setInitialOrderState} from "../../services/actions/order";

import AppHeader from "../../compontents/AppHeader/AppHeader";
import Login from '../../pages/Login'
import HomePage from "../../pages/HomePage";
import ForgotPassword from "../../pages/ForgotPassword";
import Register from "../../pages/Register";
import ResetPassword from "../../pages/ResetPassowrd";
import Profile from "../../pages/Profile";
import UserProfile from "../../pages/UserProfile";
import ProtectedUnAuthRoute from "../hoc/ProtectedUnAuthRoute";
import ProtectedAuthRoute from "../hoc/ProtectedAuthRoute";
import Ingredients from "../../pages/Ingredients";
import IngredientDetails from "../modals/IngredientsDetails/IngredientDetails";
import Modal from "../modals/Modal/Modal";
import OrderDetails from "../modals/OrderDetails/OrderDetails";
import PreLoader from "../PreLoader/PreLoader";
import Feed from "../../pages/Feed";
import FeedDetails from "../modals/FeedDetails/FeedDetails";
import FeedOrder from "../../pages/FeedOrder";

interface ILocationState {
    backgroundLocation?: string
}

const App: FC = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const {isLoading} = useSelector(state => state.auth)
    const navigate = useNavigate();
    const state = location.state as ILocationState


    useEffect(() => {
        dispatch(getUserInfo())
        dispatch(fetchIngredients())
    }, [dispatch])

    if (isLoading) return (<PreLoader/>)

    return (
        <>
            <AppHeader/>
            <Routes location={state?.backgroundLocation || location}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/ingredients/:id' element={<Ingredients/>}/>
                <Route path='/feed/:id' element={<FeedOrder/>}/>

                <Route path='/login' element={
                    <ProtectedAuthRoute>
                        <Login/>
                    </ProtectedAuthRoute>}
                />

                <Route path='/reset-password' element={
                    <ProtectedAuthRoute>
                        <ResetPassword/>
                    </ProtectedAuthRoute>
                }/>

                <Route path='/feed' element={
                    <Feed/>
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

            {state?.backgroundLocation && (
                <Routes>
                    <Route
                        path='/feed/:id'
                        element={
                            <Modal onCloseModal={() => {
                                navigate('/feed')
                            }
                            }>
                                <FeedDetails/>
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
                                dispatch(setInitialOrderState())
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
