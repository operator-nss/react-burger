import React from 'react';
import './app.module.scss';
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import appStyles from './app.module.scss'

function App() {
  return (
    <div className={appStyles.App}>
      <AppHeader/>

      <section className={appStyles.content}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </section>
    </div>
  );
}

export default App;
