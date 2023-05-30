import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {FC} from "react";
import constructorStyles from './burger-constructor.module.scss'
import {IBurger} from "../../types/types";

interface IBurgerConstructor {
	burgers: IBurger[]
	setOrder: (val:boolean) => void
}

const BurgerConstructor:FC<IBurgerConstructor> = ({burgers, setOrder}) => {
		const mainArr:IBurger[] = burgers?.filter(item => item.type !== "bun");
		const selectBun:IBurger | undefined = burgers?.find(bun => bun.type === "bun");
	
	return (
		<div className="mt-25">
			<div className={clsx("pr-2", constructorStyles.content)}>
				<ul className={constructorStyles.list}>
					
					<li className={clsx(constructorStyles.item, constructorStyles.first)}>
						<ConstructorElement
							isLocked
							type='top'
							text={`${selectBun?.name  }\n(верх)`}
							price={selectBun?.price as number}
							thumbnail={selectBun?.image_mobile as string}
						/>
					</li>
					
					<div className={clsx("custom-scroll pr-2", constructorStyles.scrollConstructor)}>
						{mainArr?.map(item => (
							<li key={item._id} className={constructorStyles.item}>
								<DragIcon type="primary"/>
								<ConstructorElement
									isLocked={false}
									text={item?.name}
									price={item.price}
									thumbnail={item.image_mobile}
								/>
							</li>
						))}
					</div>

					<li className={clsx(constructorStyles.item, constructorStyles.end)}>
						<ConstructorElement
							isLocked
							type="bottom"
							text={`${selectBun?.name   }\n(низ)`}
							price={selectBun?.price as number}
							thumbnail={selectBun?.image_mobile as string}
						/>
					</li>
				</ul>
			</div>
			
			
			<div className={clsx("mt-10", constructorStyles.order)}>
				<div className={constructorStyles.price}>
					<span className={constructorStyles.count}>610</span>
					<div className={constructorStyles.priceIcon}>
						<CurrencyIcon type="primary"/>
					</div>
					
				</div>
				
				<Button onClick={() => setOrder(true)} htmlType="button" type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
		
		</div>
	
	);
};

export default BurgerConstructor;
