import {FC, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import clsx from "clsx";
import {useSelector} from "react-redux";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {RootState, useAppDispatch} from "../../services/store";
import styles from "../common.module.scss";
import {InputType} from "../../types/types";
import {login} from "../../services/actions/userActions";
import {clearErrorMessage, clearUserLogin} from "../../services/slices/user.slice";

const Login: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordType, setPasswordType] = useState<InputType>("text")
  const dispatch = useAppDispatch();
  const {errorMessage, userLogin} = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  const onPasswordIconClick = () => {
    setPasswordType(passwordType === "text" ? "password" : "text")
  }

  const loginHandler = (e: any) => {
    if (e.keyCode === 13 || e._reactName === "onClick") {
      dispatch(login({password, email}))
    }
  }

  useEffect(() => {
    if(userLogin) {
      navigate('/profile')
      dispatch(clearUserLogin())
    }
  }, [userLogin,dispatch, navigate])

  const clearError = () => {
    if (errorMessage) {
      dispatch(clearErrorMessage())
    }
  }

  return (
    <div className={styles.content}>
      <h1 className={clsx(styles.title, 'text text_type_main-medium mb-6')}>Вход</h1>
      <form onFocus={clearError} onKeyDown={loginHandler} onSubmit={(e) => e.preventDefault()}>
        <Input
          type='text'
          placeholder='E-mail'
          onChange={e => setEmail(e.target.value)}
          value={email}
          name='mail'
          error={Boolean(errorMessage)}
          errorText={errorMessage}
          size='default'
          extraClass="mb-6"
        />

        <Input
          type={passwordType}
          placeholder='Пароль'
          onChange={e => setPassword(e.target.value)}
          icon={passwordType === 'text' ? 'ShowIcon' : 'HideIcon'}
          value={password}
          name='pass'
          error={Boolean(errorMessage)}
          onIconClick={onPasswordIconClick}
          errorText={errorMessage}
          size='default'
          extraClass="mb-6"
        />

        <Button onClick={loginHandler} extraClass='mb-20' htmlType="button" type="primary" size="medium">
          Войти
        </Button>
      </form>

      <div className={clsx(styles.links, "text mb-4 text_type_main-default")}>
        Вы — новый пользователь?
        <Link to='/register'>Зарегистрироваться</Link>
      </div>
      <div className={clsx(styles.links, "text text_type_main-default")}>
        Забыли пароль?
        <Link to='/forgot-password'>Восстановить пароль</Link>
      </div>

    </div>
  );
};

export default Login;