import {FC} from 'react'
import clsx from "clsx";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";

import OrderItem from "../order-item/OrderItem";
import {reduceIngredients} from "../../utils/order";
import {RootState} from "../../services/store";
import styles from './order-info.module.scss'
import {IOrder} from "../../services/slices/order.slice";
import {logout} from "../../services/actions/userActions";

interface IOrderInfo {
  selectOrder: IOrder
}

interface IUpdatedSelectOrder {
  name: string
  count: number
}

const OrderInfo: FC<IOrderInfo> = ({selectOrder}) => {
  const burgerItems = useSelector((state: RootState) => state.burgers.burgerItems)

  const updateSelected = () => {
    const result: IUpdatedSelectOrder[] = []
    selectOrder.ingredients.forEach(ingredient => {
      const findBun = burgerItems?.find(bun => ingredient === bun._id && bun.type === 'bun')
      const findIngredient = result.find(item => item.name === ingredient);
      if (findIngredient && ingredient === findIngredient.name) {
        findIngredient.count += 1;
      } else if (findBun && findBun._id === ingredient) {
        result.push({
          name: ingredient,
          count: 2
        })
      } else {
        result.push({
          name: ingredient,
          count: 1
        })
      }
    })
    return result
  }

  return (
    <div className={styles.container}>
      <div className={styles.number}>#{selectOrder.number}</div>
      <div className={styles.title}>{selectOrder.name}</div>
      <div
        className={clsx(selectOrder.status === 'done' ? styles.statusDone : styles.statusNotDone)}>{selectOrder.status === 'done' ? 'Выполнен' : 'Готовится'}</div>

      <div className={clsx(styles.content, 'custom-scroll')}>
        <div className={styles.structure}>Состав:</div>
        {updateSelected()?.map((item, idx) => <OrderItem count={item.count} ingredient={item.name} key={idx}/>)}
      </div>
      <div className={styles.footer}>
        <div className={styles.date}>
          {<FormattedDate date={new Date(selectOrder?.createdAt!)}/>}
        </div>
        <div className={styles.total}>
          {reduceIngredients(burgerItems, selectOrder.ingredients)}
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;