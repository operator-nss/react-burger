import clsx from "clsx";
import {FC} from "react";
import ingredientStyles from './ingredient-details.module.scss'
import {IBurger} from "../../../types/types";

interface IIngredientDetails {
  selectIngredient: IBurger | null
}

const IngredientDetails: FC<IIngredientDetails> = ({selectIngredient}) => {
  return (
    <>
      <h3 data-test='modal-title' className={clsx(ingredientStyles.title, 'text text_type_main-large')}>Детали ингредиента</h3>
      <div className={ingredientStyles.content}>
        <div className={clsx(ingredientStyles.image, 'mb-4')}>
          <img src={selectIngredient?.image_large} alt=""/>
        </div>
        <div className={clsx(ingredientStyles.name, 'text text_type_main-medium mb-8')}>{selectIngredient?.name}</div>
        <div className={clsx(ingredientStyles.structure)}>
          <div>
            <div className='text text_type_main-default'>Калории, ккал</div>
            <div
              className={clsx(ingredientStyles.structureCount, 'text text_type_digits-default mt-2')}>{selectIngredient?.calories}</div>
          </div>
          <div>
            <div className='text text_type_main-default'>Белки, г</div>
            <div
              className={clsx(ingredientStyles.structureCount, 'text text_type_digits-default mt-2')}>{selectIngredient?.proteins}</div>
          </div>
          <div>
            <div className='text text_type_main-default'>Жиры, г</div>
            <div
              className={clsx(ingredientStyles.structureCount, 'text text_type_digits-default mt-2')}>{selectIngredient?.fat}</div>
          </div>
          <div>
            <div className='text text_type_main-default'>Углеводы, г</div>
            <div
              className={clsx(ingredientStyles.structureCount, 'text text_type_digits-default mt-2')}>{selectIngredient?.carbohydrates}</div>
          </div>

        </div>
      </div>
    </>
  );
};

export default IngredientDetails;
