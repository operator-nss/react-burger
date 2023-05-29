import clsx from "clsx";
import {FC} from "react";
import orderImage from "../../../images/done.svg";
import orderStyles from './order-details.module.scss'

const OrderDetails:FC = () => (
		<div className={orderStyles.content}>
			<div className={clsx(orderStyles.title, "text text_type_digits-large mt-20")}>034536</div>
			<div className={clsx(orderStyles.subtitle, "text text_type_main-medium mt-8")}>идентификатор заказа</div>
			<div className={clsx(orderStyles.image, "mt-15")}>
				<img src={orderImage} alt=""/>
			</div>
			<div className={clsx(orderStyles.text, "text text_type_main-default mb-2 mt-15")}>Ваш заказ начали готовить</div>
			<div className={clsx(orderStyles.textGray, "text text_type_main-default mb-20")}>Дождитесь готовности на орбитальной станции</div>
		</div>
	);

export default OrderDetails;

