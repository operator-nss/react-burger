import {FC, useEffect, useState} from 'react'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../services/store";
import styles from './profile.module.scss'
import {getUser, logout, patchUser} from "../../services/actions/userActions";
import {clearSuccessMessage} from "../../services/slices/user.slice";

const menuType = ['Профиль', 'История заказов', 'Выход']

const Profile: FC = () => {
  const {user, successSave} = useSelector((state: RootState) => state.user)
  const [menu, setMenu] = useState<string>(menuType[0]);

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

  return (
    <>
      <div className={styles.content}>
        <ul>
          {menuType.map(menuItem => (
            <li onClick={() => handleMenu(menuItem)}
                className={menuItem === menu ? `${styles.menu} ${styles.active}` : styles.menu}
                key={menuItem}>{menuItem}</li>
          ))}
        </ul>

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

      {successSave && <div className={styles.success}>Изменения сохранены успешно!</div>}

    </>


  );
};

export default Profile;