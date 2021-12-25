import React from 'react';
import ProfileStyles from './Profile.module.scss'
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {logOutUser} from "../services/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {deleteCookie} from "../utils/helpers";


const Profile = () => {

    const navigate = useNavigate()

    const authState = useSelector((state => state.auth))
    const activeStyle = {
        textDecoration: 'underline'
    }

    const dispatch = useDispatch()

    const logOut = () => {

        dispatch(logOutUser())
        // console.log(authState)
        deleteCookie('accessToken')
    }

    // React.useEffect(() => {
    //     if(!authState.isAuth) {
    //         console.log('должен быть редирект')
    //         navigate('/')
    //     }
    //
    // }, [authState.isAuth])


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
