import React, {useState} from 'react';
import ingredientsStyles from './burger-ingredients.module.scss'
import {Tab, CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgers} from "../../utils/data";
import clsx from "clsx";

const types = [
	{id: 0, type: "bun", title: 'Булки'},
	{id: 1, type: "sauce", title: 'Соусы'},
	{id: 2, type: "main", title: 'Начинки'},
]

const buns = burgers.filter(item => item.type === "bun");
const sauces = burgers.filter(item => item.type === "sauce");
const filling = burgers.filter(item => item.type === "main");

const BurgerIngredients = () => {
	const [ingredientType, setIngredientType] = useState('Булки');
	
	return (
		<div className={ingredientsStyles.content}>
			
			<h1 className="text text_type_main-large mt-10 mb-5">
				Соберите бургер
			</h1>
			<div className={ingredientsStyles.tabs}>
				{types.map(type => (
					<Tab key={type.id} value={ingredientType} active={type.title === ingredientType}
					     onClick={() => setIngredientType(type.title)}>
						{type.title}
					</Tab>
				))}
			</div>
			
			<div className={clsx("custom-scroll mt-10", ingredientsStyles.lists)}>
				<h2 className="text text_type_main-medium mb-6">Булки</h2>
				<ul className={ingredientsStyles.list}>
					{buns.map(burger => (
						<li className={ingredientsStyles.burgerItem} key={burger._id}>
							<img className={ingredientsStyles.image} src={burger.image_large} alt=""/>
							<div className={clsx(ingredientsStyles.price, "text text_type_main-medium")}>
								{burger.price}
								<CurrencyIcon type="primary"/>
							</div>
							<div className={ingredientsStyles.count}>
								<Counter count={1} size="default" extraClass="m-1"/>
							</div>
							<div>{burger.name}</div>
						</li>
					))}
				</ul>
				
				<h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
				
				<ul className={ingredientsStyles.list}>
					{sauces.map(burger => (
						<li className={ingredientsStyles.burgerItem} key={burger._id}>
							<img className={ingredientsStyles.image} src={burger.image_large} alt=""/>
							<div className={clsx(ingredientsStyles.price, "text text_type_main-medium")}>
								{burger.price}
								<CurrencyIcon type="primary"/>
							</div>
							<div className={ingredientsStyles.count}>
								<Counter count={1} size="default" extraClass="m-1"/>
							</div>
							<div>{burger.name}</div>
						</li>
					))}
				</ul>
				
				<h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
				
				<ul className={ingredientsStyles.list}>
					{filling.map(burger => (
						<li className={ingredientsStyles.burgerItem} key={burger._id}>
							<img className={ingredientsStyles.image} src={burger.image_large} alt=""/>
							<div className={clsx(ingredientsStyles.price, "text text_type_main-medium")}>
								{burger.price}
								<CurrencyIcon type="primary"/>
							</div>
							<div className={ingredientsStyles.count}>
								<Counter count={1} size="default" extraClass="m-1"/>
							</div>
							<div>{burger.name}</div>
						</li>
					))}
				</ul>
			</div>
		
		</div>
	);
};
//bun main sauce
export default BurgerIngredients;
