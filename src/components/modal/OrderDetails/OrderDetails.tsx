import clsx from "clsx";
import {FC} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../services/store";
import orderImage from "../../../images/done.svg";
import orderStyles from './order-details.module.scss'
import Preloader from "../../Preloader/Preloader";

const OrderDetails: FC = () => {
  const {orderCount, isOrderLoading, orderError} = useSelector((state: RootState) => state.order)

  return (
    <div className={orderStyles.content}>
      {isOrderLoading ? <Preloader/> : (
        orderError
          ? <div className={orderStyles.error}>Ошибка обработки заказа</div>
          : <>
            <div className={clsx(orderStyles.title, "text text_type_digits-large mt-20")}>{orderCount}</div>
            <div className={clsx(orderStyles.subtitle, "text text_type_main-medium mt-8")}>идентификатор заказа</div>
            <div className={clsx(orderStyles.image, "mt-15")}>
              <img src={orderImage} alt=""/>
            </div>
            <div className={clsx(orderStyles.text, "text text_type_main-default mb-2 mt-15")}>Ваш заказ начали готовить
            </div>
            <div className={clsx(orderStyles.textGray, "text text_type_main-default mb-20")}>Дождитесь готовности на
              орбитальной станции
            </div>
          </>
      )}
    </div>
  )
}

export default OrderDetails;

