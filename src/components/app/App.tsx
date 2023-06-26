import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {setCookie} from "typescript-cookie";
import AppHeader from "../app-header/AppHeader";
import Modal from "../modal/Modal";
import {fetchIngredients} from "../../services/actions/burgerActions";
import {RootState, useAppDispatch} from "../../services/store";
import appStyles from '../../pages/Home/home.module.scss';
import {setModal} from "../../services/slices/burgers.slice";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import IngredientPage from "../../pages/IngredientPage/IngredientPage";
import NotFound from "../../pages/NotFound/NotFound";
import {OnlyAuth, OnlyUnAuth} from "../ProtectedRouteElement/ProtectedRouteElement";
import {getUser} from "../../services/actions/userActions";
import {setOrder} from "../../services/slices/order.slice";
import {setChosenIngredient} from "../../services/slices/info-ingredient.slice";

const App = () => {
  const dispatch = useAppDispatch();
  const chosenIngredient = useSelector((state: RootState) => state.info.chosenIngredient)
  const isOrder = useSelector((state: RootState) => state.order.isOrder)
  const {refreshToken, accessToken} = useSelector((state: RootState) => state.user)
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location?.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients())
    dispatch(getUser())
  }, [dispatch])

  useEffect(() => {
    if (chosenIngredient || isOrder) {
      dispatch(setModal(true))
    }
  }, [chosenIngredient, isOrder, dispatch])

  useEffect(() => {
    if (refreshToken) {
      setCookie('refreshToken', refreshToken)
    }
    if (accessToken) {
      setCookie('accessToken', accessToken)
    }
  }, [refreshToken, accessToken])

  const handleModalClose = () => {
    navigate('/')
    dispatch(setModal(false))
    dispatch(setOrder(false))
    dispatch(setChosenIngredient(null))
  };

  return (
    <div className={appStyles.App}>
      {(isOrder || chosenIngredient) && <Modal onClose={handleModalClose}/>}

      <AppHeader/>

      <Routes location={background || location}>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<OnlyUnAuth component={<Login/>}/>}/>
        <Route path="/register" element={<OnlyUnAuth component={<Register/>}/>}/>
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword/>}/>}/>
        <Route path="/profile" element={<OnlyAuth component={<Profile/>}/>}/>
        <Route path="/ingredients/:_id" element={<IngredientPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>


      {background && (
        <Routes>
          <Route
            path="/ingredients/:_id"
            element={<Modal onClose={handleModalClose}/>}
          />
        </Routes>
      )}


    </div>
  );
}

export default App;
