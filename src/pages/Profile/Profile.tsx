import {FC, useEffect, useState} from 'react'
import clsx from "clsx";
import {getCookie} from "typescript-cookie";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../services/store";
import styles from './profile.module.scss'
import {getUser, logout, patchUser} from "../../services/actions/userActions";
import {clearSuccessMessage} from "../../services/slices/user.slice";
import TapeCard from "../../components/tape-card/TapeCard";
import {connect, disconnect} from "../../services/actions/orderActions";
import {USER_ORDERS_URL} from "../../utils/constants";
import {IOrder, setChosenOrder} from "../../services/slices/order.slice";

const menuType = ['Профиль', 'История заказов', 'Выход']

const Profile: FC = () => {
  const {user, successSave, accessToken} = useSelector((state: RootState) => state.user)
  const [menu, setMenu] = useState<string>(menuType[0]);
  const {orders} = useSelector((state: RootState) => state.order)
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  useEffect(() => {
    if (user.email && user.name) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (successSave) {
      timeout = setTimeout(() => {
        dispatch(clearSuccessMessage())
      }, 3000);
    }
    return () => clearTimeout(timeout)
  }, [dispatch, successSave])

  const handleMenu = (menuItem: string) => {
    if (menuItem !== 'Выход') {
      setMenu(menuItem)
    } else {
      dispatch(logout())
      navigate('/login')
    }
  }

  const cancelHandler = () => {
    setPassword('')
    setName(user.name)
    setEmail(user.email)
  }

  const saveHandler = () => {
    dispatch(patchUser({password, email, name}))
  }

  useEffect(() => {
    if (menu === 'История заказов') {
      const url = `${USER_ORDERS_URL}?token=${getCookie('accessToken')?.slice(7)}`
      dispatch(connect(url));
    }
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch, menu, accessToken]);

  const openModalOrder = (item: IOrder) => {
    dispatch(setChosenOrder(item))
  }

  const styleContent = menu === 'История заказов' ? styles.wide : '';

  return (
    <>
      <div className={clsx(styles.content, styleContent)}>
        <ul>
          {menuType.map(menuItem => (
            <li onClick={() => handleMenu(menuItem)}
                className={menuItem === menu ? `${styles.menu} ${styles.active}` : styles.menu}
                key={menuItem}>{menuItem}</li>
          ))}
        </ul>

        {menu === 'Профиль' &&
					<div>
						<div>
							<Input
								type='text'
								placeholder='Имя'
								onChange={e => setName(e.target.value)}
								icon='EditIcon'
								value={name}
								name='name'
								error={false}
								errorText='Ошибка'
								size='default'
								extraClass="mb-6"
							/>

							<Input
								type='text'
								placeholder='Логин'
								onChange={e => setEmail(e.target.value)}
								icon='EditIcon'
								value={email}
								name='login'
								error={false}
								errorText='Ошибка'
								size='default'
								extraClass="mb-6"
							/>

							<Input
								type='text'
								placeholder='Пароль'
								onChange={e => setPassword(e.target.value)}
								icon='EditIcon'
								value={password}
								name='password'
								error={false}
								errorText='Ошибка'
								size='default'
							/>
						</div>
						<div className={styles.info}>
							<div className={styles.text}>В этом разделе вы можете
								изменить свои персональные данные
							</div>
							<div className="buttons">
								<Button onClick={cancelHandler} htmlType="button" type="secondary" size="medium">
									Отмена
								</Button>
								<Button onClick={saveHandler} htmlType="button" type="primary" size="medium">
									Сохранить
								</Button>
							</div>
						</div>
					</div>
        }

        {menu === 'История заказов' && <ul className={clsx('custom-scroll', styles.tapes)}>
            {orders?.map(order => (
              <li key={order.number}><Link state={{background: location}} to={`/profile/orders/${order.number}`} onClick={() => openModalOrder(order)}><TapeCard order={order} wide/></Link></li>
            ))}
				</ul>}

      </div>


      {successSave && <div className={styles.success}>Изменения сохранены успешно!</div>}

    </>


  );
};

export default Profile;