import React from 'react';
import './app.module.scss';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
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
