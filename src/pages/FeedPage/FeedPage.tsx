import {FC, useEffect, useState} from 'react'
import {useLocation, useParams} from "react-router-dom";
import {getCookie} from "typescript-cookie";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../services/store";
import {IOrder} from "../../services/slices/order.slice";
import styles from './feed-page.module.scss'
import OrderInfo from "../../components/order-details/OrderInfo";
import {connect, disconnect} from "../../services/actions/orderActions";
import {ALL_ORDERS_URL, USER_ORDERS_URL} from "../../utils/constants";
import Preloader from "../../components/Preloader/Preloader";

const FeedPage: FC = () => {
  const orders = useSelector((state: RootState) => state.order.orders)
  const params = useParams()
  const [selectOrder, setSelectOrder] = useState<IOrder | null>(null);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/profile/orders')) {
      const url = `${USER_ORDERS_URL}?token=${getCookie('accessToken')?.slice(7)}`
      dispatch(connect(url));
    } else if (location.pathname.includes('/feed')) {
      dispatch(connect(ALL_ORDERS_URL));
    }
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch, location.pathname]);

  useEffect(() => {
    const findOrder = orders?.find(item => String(item?.number) === String(params?.number))
    if (findOrder) {
      setSelectOrder(findOrder)
    } else {
      setSelectOrder(null)
    }
  }, [orders, dispatch, params?.number])

  if (orders === null) {
    return (
      <div className={styles.order_feed}>
        <Preloader />
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
    <div className={styles.container}>
      {selectOrder
        ? <OrderInfo selectOrder={selectOrder}/>
        : <div className={styles.error}>Ингредиент не найден</div>}
    </div>
  );
};

export default FeedPage;