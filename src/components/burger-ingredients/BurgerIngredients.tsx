import {FC, useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import clsx from "clsx";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useInView} from 'react-intersection-observer';
import {IBurger} from "../../types/types";
import ingredientsStyles from './burger-ingredients.module.scss'
import {RootState, useAppDispatch} from "../../services/store";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import {setChosenIngredient} from "../../services/slices/info-ingredient.slice";
import {types} from "../../utils/data";

const BurgerIngredients: FC = () => {
  const [ingredientType, setIngredientType] = useState('Булки');
  const bunRef = useRef<HTMLHeadingElement | null>(null);
  const sauceRef = useRef<HTMLHeadingElement | null>(null);
  const fillingRef = useRef<HTMLHeadingElement | null>(null);

  const {burgerItems} = useSelector((state: RootState) => state.burgers)

  const buns: IBurger[] = useMemo(() => burgerItems?.filter(item => item.type === "bun"), [burgerItems]);
  const sauces: IBurger[] = useMemo(() => burgerItems?.filter(item => item.type === "sauce"), [burgerItems]);
  const filling: IBurger[] = useMemo(() => burgerItems?.filter(item => item.type === "main"), [burgerItems]);

  const dispatch = useAppDispatch();

  const {ref: refBun, inView: bunInView} = useInView({
    threshold: 0,
  });
  const {ref: refSouce, inView: souceInView} = useInView({
    threshold: 0,
  });
  const {ref: refFilling, inView: fillingInView} = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (bunInView) {
      setIngredientType('Булки')
      return
    }
    if (souceInView) {
      setIngredientType('Соусы')
      return
    }
    if (fillingInView) {
      setIngredientType('Начинки')
      return
    }
  }, [bunInView, souceInView, fillingInView])

  const handleTabClick = (title: string) => {
    setIngredientType(title);
    const easyScroll: object = {behavior: "smooth"};
    switch (title) {
      case 'Булки':
        bunRef.current?.scrollIntoView(easyScroll);
        break;
      case 'Соусы':
        sauceRef.current?.scrollIntoView(easyScroll);
        break;
      default:
        fillingRef.current?.scrollIntoView(easyScroll);
    }
  }

  const getIngredientInfo = (burger:IBurger) => {
      dispatch(setChosenIngredient(burger))
   }

  return (
    <div className={ingredientsStyles.content}>

      <h1 className="text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </h1>
      <div className={ingredientsStyles.tabs}>
        {types.map(type => (
          <Tab key={type.id} value={ingredientType} active={type.title === ingredientType}
               onClick={() => handleTabClick(type.title)}>
            {type.title}
          </Tab>
        ))}
      </div>


      <div className={clsx("custom-scroll mt-10", ingredientsStyles.lists)}>
        <h2 ref={bunRef} className="text text_type_main-medium mb-6">Булки</h2>
        <ul ref={refBun} className={ingredientsStyles.list}>
          {buns?.map(burger => (
            <div className={ingredientsStyles.burgerItem} onClick={() => getIngredientInfo(burger)} key={burger._id}>
              <BurgerIngredient burger={burger}/>
            </div>
          ))}
        </ul>

        <h2 ref={sauceRef} className="text text_type_main-medium mt-10 mb-6">Соусы</h2>

        <ul ref={refSouce} className={ingredientsStyles.list}>
          {sauces?.map(burger => (
            <div className={ingredientsStyles.burgerItem} onClick={() => getIngredientInfo(burger)} key={burger._id}>
              <BurgerIngredient burger={burger}/>
            </div>
          ))}
        </ul>

        <h2 ref={fillingRef} className="text text_type_main-medium mt-10 mb-6">Начинки</h2>

        <ul ref={refFilling} className={ingredientsStyles.list}>
          {filling?.map(burger => (
            <div className={ingredientsStyles.burgerItem} onClick={() => getIngredientInfo(burger)} key={burger._id}>
              <BurgerIngredient burger={burger}/>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BurgerIngredients;
