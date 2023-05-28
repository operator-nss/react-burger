import React from "react";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgers} from "../../utils/data";
import constructorStyles from './burger-constructor.module.scss'
import clsx from "clsx";

const mainArr = burgers.filter(item => item.type !== "bun");
const selectBun = burgers.find(bun => bun.type === "bun");

const BurgerConstructor = () => {
	
	return (
		<div className="mt-25">
			<div className={clsx("pr-2", constructorStyles.content)}>
				<ul className={constructorStyles.list}>
					
					<li className={clsx(constructorStyles.item, constructorStyles.first)}>
						<ConstructorElement
							isLocked={true}
							type={'top'}
							text={selectBun.name}
							price={selectBun.price}
							thumbnail={selectBun.image_mobile}
						/>
					</li>
					
					<div className={clsx("custom-scroll pr-2", constructorStyles.scrollConstructor)}>
						{mainArr.map(item => (
							<li key={item._id} className={constructorStyles.item}>
								<DragIcon type="primary"/>
								<ConstructorElement
									isLocked={false}
									text={item.name}
									price={item.price}
									thumbnail={item.image_mobile}
								/>
							</li>
						))}
					</div>

					<li className={clsx(constructorStyles.item, constructorStyles.end)}>
						<ConstructorElement
							isLocked={true}
							type={'bottom'}
							text={selectBun.name}
							price={selectBun.price}
							thumbnail={selectBun.image_mobile}
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
				
				<Button htmlType="button" type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
		
		</div>
	
	);
};

export default BurgerConstructor;
