import {FC, useRef} from 'react'
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IConstructorIngredient, sortFilling} from "../../services/slices/constructor.slice";
import constructorStyles from "../burger-constructor/burger-constructor.module.scss";
import {useAppDispatch} from "../../services/store";
import {IConstructorDnDBurger} from "../../types/types";

interface ConstructorIngredientInterface extends IConstructorIngredient {
  deleteFillingHandler: (id: string) => void
  itemIndex: number
  burger: IConstructorIngredient
}

const ConstructorIngredient: FC<ConstructorIngredientInterface> = (
  {
    burger,
    itemIndex,
    deleteFillingHandler,
  }) => {

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null)

  const [{isDragging}, dragElement] = useDrag({
    item: () => {
      return {burger, itemIndex}
    },
    type: "burger-list",
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })


  const [, dropElement] = useDrop<IConstructorDnDBurger>({
    accept: "burger-list",
    collect(monitor) {
      return {
        handlerElement: monitor.getHandlerId
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = itemIndex
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      if (dragIndex !== undefined) {
        dispatch(sortFilling({dragIndex, hoverIndex}))
      }
      item.index = hoverIndex
    }
  })
  dragElement(dropElement(ref))

  return (
    <li ref={ref} className={constructorStyles.item}>
      <DragIcon type="primary"/>
      <ConstructorElement
        isLocked={false}
        text={burger.name}
        price={burger.price}
        thumbnail={burger.image_mobile}
        handleClose={() => deleteFillingHandler(burger.idKey)}
      />
    </li>
  );
};

export default ConstructorIngredient;