import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {FC} from "react";
import {NavLink} from "react-router-dom";
import headerStyles from './header.module.scss'


const AppHeader: FC = () => {

  return (
    <div className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <ul className={headerStyles.list}>
          <li className={headerStyles.listItem}>
            <NavLink className={({ isActive }) => isActive ? headerStyles.activeLink : ""} to='/'>
              <BurgerIcon type="secondary"/>
              <p className="text_type_main-default ml-2">Конструктор</p>
            </NavLink>
          </li>
          <li className={headerStyles.listItem}>
            <NavLink className={({ isActive }) => isActive ? headerStyles.activeLink : ""} to='/feed'>
              <ListIcon type="secondary"/>
              <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={headerStyles.logo}><Logo/></div>
      <div className={headerStyles.user}>
        <NavLink  to='/profile' className={({ isActive }) => isActive ? headerStyles.activeLink : ""}>
          <ProfileIcon type="secondary"/>
          <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
        </NavLink>
      </div>

    </div>
  );
}


export default AppHeader;
