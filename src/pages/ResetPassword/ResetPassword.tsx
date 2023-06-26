import {FC, useEffect, useState} from 'react'
import clsx from "clsx";
import {useSelector} from "react-redux";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import styles from "../common.module.scss";
import {InputType} from "../../types/types";
import {resetPassword} from "../../services/actions/userActions";
import {RootState, useAppDispatch} from "../../services/store";
import {clearSuccess} from "../../services/slices/user.slice";

const ResetPassword: FC = () => {

  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [passwordType, setPasswordType] = useState<InputType>("text")
  const dispatch = useAppDispatch();
  const successReset = useSelector((state: RootState) => state.user.successReset)
  const navigate = useNavigate();

  useEffect(() => {
    if(successReset) {
      navigate('/profile')
      dispatch(clearSuccess())
    }
  }, [successReset, dispatch, navigate])

  const onPasswordIconClick = () => {
    setPasswordType(passwordType === "text" ? "password" : "text")
  }

  const resetPasswordHandler = (e: any) => {
    if (e.keyCode === 13 || e._reactName === "onClick") {
      dispatch(resetPassword({password, token}))
    }
  }

  return (

    <div className={styles.content}>
      <h1 className={clsx(styles.title, 'text text_type_main-medium mb-6')}>Восстановление пароля</h1>
      <form onKeyDown={resetPasswordHandler} onSubmit={(e) => e.preventDefault()}>

        <Input
          type={passwordType}
          placeholder='Введите новый пароль'
          onChange={e => setPassword(e.target.value)}
          icon={passwordType === 'text' ? 'ShowIcon' : 'HideIcon'}
          value={password}
          name='pass'
          error={false}
          onIconClick={onPasswordIconClick}
          errorText='Ошибка'
          size='default'
          extraClass="mb-6"
        />

        <Input
          type='text'
          placeholder='Введите код из письма'
          onChange={e => setToken(e.target.value)}
          value={token}
          name='mail'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass="mb-6"
        />

        <Button onClick={resetPasswordHandler} extraClass='mb-20' htmlType="button" type="primary" size="medium">
          Сохранить
        </Button>
      </form>

      <div className={clsx(styles.links, "text mb-4 text_type_main-default")}>
        Вспомнили пароль?
        <Link to='/login'>Войти</Link>
      </div>

    </div>
  );
};

export default ResetPassword;