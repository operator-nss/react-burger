import React, {FC} from 'react'
import {DndProvider} from "react-dnd";
import {useSelector} from "react-redux";
import {HTML5Backend} from "react-dnd-html5-backend";
import Preloader from "../../components/Preloader/Preloader";
import appStyles from "./home.module.scss";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import {RootState} from "../../services/store";

const Home: FC = () => {
  const {isLoading, errorBurgers} = useSelector((state: RootState) => state.burgers)

  return (
    <DndProvider backend={HTML5Backend}>
      {(isLoading) ? <Preloader/> :
        (errorBurgers
          ? <div>Ошибка получения ингредиентов с сервера. Попробуйте позже</div>
          : <section className={appStyles.content}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </section>)}
    </DndProvider>
  );
};

export default Home;