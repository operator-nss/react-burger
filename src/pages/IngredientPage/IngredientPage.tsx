import {FC, useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import IngredientDetails from "../../components/modal/IngredientDetails/IngredientDetails";
import {RootState} from "../../services/store";
import {IBurger} from "../../types/types";
import styles from './ingredient-page.module.scss'

const IngredientPage: FC = () => {
  const [chosenIngredient, setChosenIngredient] = useState<IBurger | null>(null);
  const burgerItems = useSelector((state: RootState) => state.burgers.burgerItems)
  const params = useParams()

  useEffect(() => {
    const ingredient = burgerItems?.find(item => item._id === params._id)
    if (ingredient) {
      setChosenIngredient(ingredient)
    } else {
      setChosenIngredient(null)
    }
  }, [burgerItems, params])

  return (
    <div className='mt-30'>
      {chosenIngredient
        ? <IngredientDetails selectIngredient={chosenIngredient}/>
        : <div className={styles.error}>Ингредиент не найден</div>}
    </div>
  );
};

export default IngredientPage;