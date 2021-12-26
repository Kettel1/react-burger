import React from 'react';
import ProfileStyles from './Profile.module.scss'
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {logOutUser} from "../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {deleteCookie} from "../utils/helpers";


const Profile = () => {
    const authState = useSelector((state => state.auth))
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const logOut = () => {

        dispatch(logOutUser(() => {
            navigate('/')
        }))



        deleteCookie('accessToken')
    }

    return (authState.isLoading
            ? (<div>Загрузка</div>)
            : (<section className={ProfileStyles.container}>
                <div className={ProfileStyles.innerContainer}>
                    <ul className={ProfileStyles.list}>
                        <li className={ProfileStyles.item}>
                            <NavLink className={({isActive}) => {
                                return `${isActive ? ProfileStyles.activeLink : ProfileStyles.link}`
                            }} to='/profile/'>Профиль</NavLink>
                        </li>
                        <li className={ProfileStyles.item}>
                            <NavLink
                                className={({isActive}) => isActive ? ProfileStyles.activeLink : ProfileStyles.link}
                                to='/profile/orders'>История заказов</NavLink>
                        </li>
                        <li className={ProfileStyles.item}>
                            <button onClick={logOut} className={ProfileStyles.logOutBtn}>Выход</button>
                        </li>
                    </ul>

                    <p className={ProfileStyles.description}>В этом разделе вы можете<br/>изменить свои персональные
                        данные</p>
                </div>

                <Outlet/>

            </section>)
    )
}


export default Profile;
