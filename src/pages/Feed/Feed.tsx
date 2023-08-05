import {FC, useEffect} from 'react'
import clsx from "clsx";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import TapeCard from "../../components/tape-card/TapeCard";
import styles from './feed.module.css'
import {RootState, useAppDispatch} from "../../services/store";
import {IOrder, setChosenOrder} from "../../services/slices/order.slice";
import {connect, disconnect} from "../../services/actions/orderActions";
import {ALL_ORDERS_URL} from "../../utils/constants";

const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const {total, totalToday, orders} = useSelector((state: RootState) => state.order)
  const location = useLocation();

  useEffect(() => {
    dispatch(connect(ALL_ORDERS_URL));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);


  const openModalOrder = (item: IOrder) => {
    dispatch(setChosenOrder(item))
  }


  if (orders === null) {
    return (
      <div className={styles.order_feed}>
        <p className="text_type_main-default">Загрузка...</p>
      </div>
    );
  }

  if (
    orders === undefined ||
    orders.length === 0
  ) {
    return (
      <div className={styles.order_feed}>
        <p className="text_type_main-default">Заказов пока нет</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className={styles.title}>
        Лента заказов
      </h1>
      <div className={styles.main}>
        <ul className={clsx('custom-scroll', styles.tapes)}>
          {orders?.map(order => (
            <li key={order._id}><Link state={{background: location}} to={`/feed/${order.number}`} onClick={() => openModalOrder(order)}><TapeCard order={order}/></Link></li>
          ))}
        </ul>
        <div className={styles.orders}>

          <div className={clsx(styles.workingOrders, 'custom-scroll')}>

            <div className={styles.ready}>
              <div className={styles.orderTitle}>Готовы:</div>
              <ul className={clsx(styles.readyOrders, 'custom-scroll')}>
                {orders?.map(item => {
                  return item.status === 'done' && <li key={item.number} className={styles.order}>{item.number}</li>
                })}
              </ul>
            </div>

            <div className={styles.notReady}>
              <div className={styles.orderTitle}>В работе:</div>
              <ul className={styles.notReadyOrders}>
                {orders?.map(item => {
                  return item.status === 'pending' && <li key={item.number} className={styles.order}>{item.number}</li>
                })}
              </ul>
            </div>
          </div>

          <div className={clsx(styles.done, 'mt-15')}>
            <div className={styles.doneTitle}>
              Выполнено за все время:
            </div>
            <div className={clsx(styles.doneCount, 'mb-15 text text_type_digits-large')}>
              {total}
            </div>
          </div>

          <div className={styles.done}>
            <div className={styles.doneTitle}>
              Выполнено за сегодня:
            </div>
            <div className={clsx(styles.doneCount, 'text text_type_digits-large')}>
              {totalToday}
            </div>
          </div>


        </div>
      </div>


    </div>
  );
};

export default Feed;