import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {FC} from "react";
import headerStyles from './header.module.scss'

interface IAppHeader {
  setOpenModal: (value: boolean) => void
  openModal: boolean
}

const AppHeader: FC<IAppHeader> = () => (
    <div className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <ul className={headerStyles.list}>
          <li className={headerStyles.listItem}>
            <a href="#">
              <BurgerIcon type="primary"/>
              <p className="text_type_main-default ml-2">Конструктор</p>
            </a>
          </li>
          <li className={headerStyles.listItem}>
            <a href="#">
              <ListIcon type="secondary"/>
              <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
            </a>
          </li>
        </ul>
      </nav>
      <div className={headerStyles.logo}><Logo/></div>
      <div className={headerStyles.user}>
        <ProfileIcon type="secondary"/>
        <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
      </div>
    </div>
  )


export default AppHeader;
