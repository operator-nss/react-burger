import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import Modal from "../modal/Modal";
import {fetchIngredients} from "../../services/actions/burgerActions";
import {RootState, useAppDispatch} from "../../services/store";
import Preloader from "../Preloader/Preloader";
import appStyles from './app.module.scss';
import {setModal} from "../../services/slices/burgers.slice";


const App = () => {
  const dispatch = useAppDispatch();
  const {isLoading, errorBurgers} = useSelector((state: RootState) => state.burgers)
  const {chosenIngredient} = useSelector((state: RootState) => state.info)
  const {isOrder} = useSelector((state: RootState) => state.order)

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  useEffect(() => {
    if (chosenIngredient || isOrder) {
      dispatch(setModal(true))
    }
  }, [chosenIngredient, isOrder, dispatch])

  return (
    <div className={appStyles.App}>
      {(isOrder || chosenIngredient) && <Modal/>}

      <AppHeader/>
      <DndProvider backend={HTML5Backend}>
        {(isLoading) ? <Preloader/> :
          (errorBurgers
            ? <div>Ошибка получения ингредиентов с сервера. Попробуйте позже</div>
            : <section className={appStyles.content}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </section>)}
      </DndProvider>
    </div>
  );
}

export default App;
