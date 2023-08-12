import {FC, useCallback} from 'react';
import clsx from "clsx";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../services/store";
import {IBurger} from "../../types/types";
import ingredientsStyles from './burger-ingredients.module.scss'


interface IBurgerIngredient {
  burger: IBurger
}

const BurgerIngredient: FC<IBurgerIngredient> = ({burger}) => {

  const {bun, ingredients} = useSelector((state: RootState) => state.burgerConstructor)
  const location = useLocation();
  const countIngredient = useCallback(() => {
    return ingredients?.filter(ingredient => ingredient._id === burger._id)?.length
  }, [burger._id, ingredients])

  const [{isDragging}, drag] = useDrag(
    () => ({
      type: 'ingredient',
      item: burger,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  )

  return (
    <Link
      to={`/ingredients/${burger._id}`}
      state={{background: location}}
      ref={drag}
      className={ingredientsStyles.burgerItem}
      data-test={burger.name}
    >
      <img className={ingredientsStyles.image} src={burger.image_large} alt=""/>
      <div className={clsx(ingredientsStyles.price, "text text_type_main-medium")}>
        {burger.price}
        <CurrencyIcon type="primary"/>
      </div>
      <div className={ingredientsStyles.count}>
        {countIngredient() !== 0 && <Counter count={countIngredient()} size="default" extraClass="m-1"/>}
        {bun?.name === burger.name && <Counter count={2} size="default" extraClass="m-1"/>}
      </div>
      <div>{burger.name}</div>
    </Link>
  );
};

export default BurgerIngredient;
