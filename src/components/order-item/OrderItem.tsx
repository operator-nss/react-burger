import {FC} from "react";
import {useSelector} from "react-redux";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {RootState} from "../../services/store";
import styles from './order-item.module.scss'


interface IOrderItem {
  ingredient: string
  count: number
}

const OrderItem: FC<IOrderItem> = ({ingredient, count}) => {
  const burgerItems = useSelector((state: RootState) => state.burgers.burgerItems)
  const findItem = burgerItems.find(item => item._id === ingredient)
  return (
    <div className={styles.container}>
      <img className={styles.image} src={findItem?.image_mobile} alt={findItem?.name}/>
      <div className={styles.title}>{findItem?.name}</div>
      <div className={styles.price}> {count} x {findItem?.price}<CurrencyIcon type="primary"/></div>
    </div>
  );
};

export default OrderItem;