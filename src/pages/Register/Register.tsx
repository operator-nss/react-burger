import {ChangeEvent, FC, SyntheticEvent, useEffect, useRef, useState} from 'react'
import clsx from "clsx";
import {useSelector} from "react-redux";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {InputType} from "../../types/types";
import styles from '../common.module.scss'
import {register} from "../../services/actions/userActions";
import {RootState, useAppDispatch} from "../../services/store";
import {clearErrorMessage} from "../../services/slices/user.slice";

const Register: FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('');
  const [passwordType, setPasswordType] = useState<InputType>("text")
  const inputRef = useRef(null)
  const dispatch = useAppDispatch();
  const {errorMessage, accessToken} = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  const onPasswordIconClick = () => {
    setPasswordType(passwordType === "text" ? "password" : "text")
  }

  const registerHandler = () => {
    dispatch(register({email, password, name}))
  }

  const clearError = () => {
    if (errorMessage) {
      dispatch(clearErrorMessage())
    }
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/profile')
    }
  }, [accessToken, navigate])


  return (
    <div className={styles.content}>
      <h1 className={clsx(styles.title, 'text text_type_main-medium mb-6')}>Регистрация</h1>
      <form onFocus={clearError} onSubmit={(e) => e.preventDefault()}>

        <Input
          type='text'
          placeholder='Имя'
          onChange={e => setName(e.target.value)}
          value={name}
          name='name'
          error={Boolean(errorMessage)}
          errorText={errorMessage}
          size='default'
          extraClass="mb-6"
        />

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
          ref={inputRef}
          onIconClick={onPasswordIconClick}
          errorText={errorMessage}
          size='default'
          extraClass="mb-6"
        />

        <Button onClick={registerHandler} extraClass='mb-20' htmlType="button" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>

      <div className={clsx(styles.links, "text text_type_main-default")}>
        Уже зарегистрированы?
        <Link to='/login'>Войти</Link>
      </div>

    </div>
  );
};

export default Register;