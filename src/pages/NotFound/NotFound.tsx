import {FC} from 'react'
import styles from './not.module.scss'

const NotFound: FC = () => {

  return (
    <div className={styles.not}>
      <h1>Страницы не существует :(</h1>
    </div>
  );
};

export default NotFound;