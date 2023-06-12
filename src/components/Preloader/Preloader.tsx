import {FC} from "react";
import loading from '../../images/spinner.svg'
import styles from './preloader.module.scss'

const Preloader:FC = () => {
  return (
    <div className={styles.wrapper}>
      <img src={loading} alt="preloader"/>
    </div>
  );
};

export default Preloader;
