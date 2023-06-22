import {FC, useEffect, useState} from 'react'
import clsx from "clsx";
import {useSelector} from "react-redux";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import styles from "../common.module.scss";
import {RootState, useAppDispatch} from "../../services/store";
import {sendEmailReset} from "../../services/actions/userActions";

const ForgotPassword: FC = () => {

  const [email, setEmail] = useState<string>('')
  const ResetEmailSent = useSelector((state: RootState) => state.user.ResetEmailSent)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const resetPasswordHandler = (e: any) => {
    if (e.keyCode === 13 || e._reactName === "onClick") {
      dispatch(sendEmailReset('operator_nss@mail.ru'))
    }
  }

  useEffect(() => {
    if (ResetEmailSent) {
      navigate('/reset-password')
    }
  }, [ResetEmailSent, navigate])

  return (

    <div className={styles.content}>
      <h1 className={clsx(styles.title, 'text text_type_main-medium mb-6')}>Восстановление пароля</h1>
      <form onSubmit={(e) => e.preventDefault()} onKeyDown={resetPasswordHandler}>
        <Input
          type='text'
          placeholder='Укажите e-mail'
          onChange={e => setEmail(e.target.value)}
          value={email}
          name='mail'
          error={false}
          errorText='Ошибка'
          size='default'
          extraClass="mb-6"
        />

        <Button onClick={resetPasswordHandler} extraClass='mb-20' htmlType="button" type="primary" size="medium">
          Восстановить
        </Button>
      </form>

      <div className={clsx(styles.links, "text mb-4 text_type_main-default")}>
        Вспомнили пароль?
        <Link to='/login'>Войти</Link>
      </div>

    </div>
  );
};

export default ForgotPassword;