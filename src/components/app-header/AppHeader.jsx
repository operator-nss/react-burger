import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './header.module.scss'

const AppHeader = () => {
	return (
		<div className={headerStyles.header}>
			<nav className={headerStyles.nav}>
				<ul className={headerStyles.list}>
					<li className={headerStyles.listItem}>
						<BurgerIcon type="primary"/>
						<p className="text_type_main-default ml-2">Конструктор</p>
					</li>
					<li className={headerStyles.listItem}>
						<ListIcon type="secondary"/>
						<p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
					</li>
				</ul>
			</nav>
			
			<div className={headerStyles.logo}><Logo/></div>
			
			<div className={headerStyles.user}>
				<ProfileIcon type="secondary"/>
				<p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
			</div>
		
		
		</div>
	);
};

export default AppHeader;
