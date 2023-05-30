import React, {useEffect, useState} from 'react';
import axios from "axios";
import appStyles from './app.module.scss';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import {API_URL} from "../../utils/constants";
import Modal from "../modal/Modal";
import {IBurger} from "../../types/types";

const App = () => {
	const [burgersData, setBurgersData] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [selectIngredient, setSelectIngredient] = useState<IBurger | null>(null);
	const [order, setOrder] = useState<boolean>(false);
	
	const fetchData = async () => {
		try {
			const {data} = await axios.get(API_URL);
			setBurgersData(data.data)
		} catch (err: unknown) {
			console.log(err)
		}
	}
	
	useEffect(() => {
		fetchData()
	}, [])
	
	useEffect(() => {
		if (selectIngredient || order) {
			setOpenModal(true)
		}
	}, [selectIngredient, order])
	
	return (
		<div className={appStyles.App}>
			<Modal setSelectIngredient={setSelectIngredient} setOrder={setOrder} order={order} selectIngredient={selectIngredient} setOpenModal={setOpenModal} openModal={openModal}/>
			<AppHeader openModal={openModal} setOpenModal={setOpenModal}/>
			<section className={appStyles.content}>
				<BurgerIngredients setSelectIngredient={setSelectIngredient} burgers={burgersData}/>
				<BurgerConstructor setOrder={setOrder} burgers={burgersData}/>
			</section>
		</div>
	);
}

export default App;
