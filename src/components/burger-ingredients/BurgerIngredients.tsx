import {useState, useRef, FC, SetStateAction, Dispatch} from 'react';
import {Tab, CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import ingredientsStyles from './burger-ingredients.module.scss'
import {IBurger} from "../../types/types";

const types = [
	{id: 0, type: "bun", title: 'Булки'},
	{id: 1, type: "sauce", title: 'Соусы'},
	{id: 2, type: "main", title: 'Начинки'},
]

interface IBurgerIngredients {
	burgers: IBurger[]
	setSelectIngredient: Dispatch<SetStateAction<IBurger | null>>
}

const BurgerIngredients:FC<IBurgerIngredients> = ({burgers, setSelectIngredient}) => {
	const [ingredientType, setIngredientType] = useState('Булки');
	const bunRef = useRef<HTMLHeadingElement | null>(null);
	const sauceRef = useRef<HTMLHeadingElement | null>(null);
	const fillingRef = useRef<HTMLHeadingElement | null>(null);
	
	const buns:IBurger[] = burgers?.filter(item => item.type === "bun");
	const sauces:IBurger[] = burgers?.filter(item => item.type === "sauce");
	const filling:IBurger[] = burgers?.filter(item => item.type === "main");
	
	const handleTabClick = (title:string) => {
		setIngredientType(title);
		const easyScroll: object = { behavior: "smooth" };
		switch (title) {
			case 'Булки':
				bunRef.current?.scrollIntoView(easyScroll);
				break;
			case 'Соусы':
				sauceRef.current?.scrollIntoView(easyScroll);
				break;
			default:
				fillingRef.current?.scrollIntoView(easyScroll);
		}
	 }
	
	return (
		<div className={ingredientsStyles.content}>
			
			<h1 className="text text_type_main-large mt-10 mb-5">
				Соберите бургер
			</h1>
			<div className={ingredientsStyles.tabs}>
				{types.map(type => (
					<Tab key={type.id} value={ingredientType} active={type.title === ingredientType}
					     onClick={() => handleTabClick(type.title)}>
						{type.title}
					</Tab>
				))}
			</div>
			
			<div className={clsx("custom-scroll mt-10", ingredientsStyles.lists)}>
				<h2 ref={bunRef} className="text text_type_main-medium mb-6">Булки</h2>
				<ul className={ingredientsStyles.list}>
					{buns.map(burger => (
						<li onClick={() => setSelectIngredient(burger)} className={ingredientsStyles.burgerItem} key={burger._id}>
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
				
				<h2 ref={sauceRef} className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
				
				<ul className={ingredientsStyles.list}>
					{sauces.map(burger => (
						<li onClick={() => setSelectIngredient(burger)} className={ingredientsStyles.burgerItem} key={burger._id}>
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
				
				<h2 ref={fillingRef} className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
				
				<ul className={ingredientsStyles.list}>
					{filling.map(burger => (
						<li onClick={() => setSelectIngredient(burger)} className={ingredientsStyles.burgerItem} key={burger._id}>
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

export default BurgerIngredients;
