import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {FC, useEffect} from "react";
import {useDrop} from "react-dnd";
import {getCookie} from "typescript-cookie";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState, useAppDispatch} from "../../services/store";
import {IBurger} from "../../types/types";
import constructorStyles from './burger-constructor.module.scss'
import {deleteFilling, setFilling, setMainBun} from "../../services/slices/constructor.slice";
import {setOrder, setTotalPrice} from "../../services/slices/order.slice";
import ConstructorIngredient from "../burger-ingredient/ConstructorIngredient";
import {getOrder} from "../../services/actions/orderActions";


const BurgerConstructor: FC = () => {

  const {bun, ingredients} = useSelector((state: RootState) => state.burgerConstructor)
  const {totalPrice} = useSelector((state: RootState) => state.order)
  const {burgerItems} = useSelector((state: RootState) => state.burgers)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const onDropAddHandler = (item: IBurger) => {
    const findItem = burgerItems?.find(ingredient => ingredient._id === item._id)
    if (findItem && findItem.type === 'bun') {
      dispatch(setMainBun(findItem))
    } else if (bun && findItem && findItem.type !== 'bun') {
      const idKey = findItem._id + ingredients?.length
      dispatch(setFilling({
        ...findItem,
        idKey
      }))
    }
  }

  const deleteFillingHandler = (idKey: string) => {
    dispatch(deleteFilling(idKey))
  }

  const [{isHover}, dropList] = useDrop({
    accept: "ingredient",
    drop(item: IBurger) {
      onDropAddHandler(item)
    },
    collect: monitor => ({
      isHover: !!monitor.isOver()
    })
  })


  useEffect(() => {
    let burgerPrice = 0;
    if (bun) {
      burgerPrice += bun?.price * 2;
    }
    if (ingredients?.length) {
      let ingredientsSum = 0
      ingredients?.forEach((item: IBurger) => {
        ingredientsSum += item.price
      }, 0)
      burgerPrice += ingredientsSum;
    }
    dispatch(setTotalPrice(burgerPrice))
  }, [bun, ingredients, dispatch])

  const getOrderHandler = () => {
    if (!getCookie('accessToken')) {
      return navigate("/login", {
        replace: true,
      });
    }
    dispatch(setOrder(true))
    dispatch(getOrder())
  }

  return (
    <div ref={dropList} data-test='constructor-burgers' className="mt-25">
      <div className={clsx("pr-2", constructorStyles.content)}>
        <ul className={constructorStyles.list}>

          {bun && <li data-test='constructor-burger-top' className={clsx(constructorStyles.item, constructorStyles.first)}>
						<ConstructorElement
							isLocked
							type='top'
							text={`${bun?.name}\n(верх)`}
							price={bun?.price as number}
							thumbnail={bun?.image_mobile as string}
						/>
					</li>}

          {bun && ingredients && <div className={clsx("custom-scroll pr-2", constructorStyles.scrollConstructor)}>
            {ingredients?.map((burger, index) => (
              <ConstructorIngredient
                itemIndex={index}
                deleteFillingHandler={deleteFillingHandler}
                burger={burger}
                key={burger.idKey}
                {...burger}
              />
            ))}
					</div>}

          {bun && <li data-test='constructor-burger-bottom' className={clsx(constructorStyles.item, constructorStyles.end)}>
						<ConstructorElement
							isLocked
							type="bottom"
							text={`${bun?.name}\n(низ)`}
							price={bun?.price as number}
							thumbnail={bun?.image_mobile as string}
						/>
					</li>}
        </ul>
      </div>


      <div className={clsx("mt-10", constructorStyles.order)}>
        <div className={constructorStyles.price}>
          <span className={constructorStyles.count}>{totalPrice}</span>
          <div className={constructorStyles.priceIcon}>
            <CurrencyIcon type="primary"/>
          </div>

        </div>

        <Button disabled={!bun} onClick={getOrderHandler} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>

    </div>

  );
};

export default BurgerConstructor;
