import {FC} from 'react'
import clsx from "clsx";
import {useSelector} from "react-redux";
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tape-card.module.scss'
import {IOrder} from "../../services/slices/order.slice";
import {RootState} from "../../services/store";
import {reduceIngredients} from "../../utils/order";
import lastImage from '../../images/illustration.svg'

interface ITapeCard {
  wide?: boolean
  order?: IOrder
}

const TapeCard: FC<ITapeCard> = ({wide, order}) => {
  const burgerItems = useSelector((state: RootState) => state.burgers.burgerItems)
  const styleContent = wide && styles.wide;

  const imagesOrder = () => {
      const images:string[] = [];
      let totalImages = 0;
    order?.ingredients.forEach(ingredient => {
      const image = burgerItems?.find(item => item._id === ingredient)?.image_mobile;
      totalImages += 1;
      if(image && images.length === 5) {
        images.push(lastImage)
      } else if(image && images.length < 5) {
        images.push(image)
      }
    })
    return {images, totalImages};
   }

  return (
    <div className={clsx(styleContent, styles.card)}>
      <div className={styles.header}>
        <div className={styles.order}>#{order?.number}</div>
        <div className={styles.date}>{<FormattedDate date={new Date(order?.createdAt!)}/>}</div>
      </div>
      <div className={styles.title}>{order?.name}</div>
      <div className={styles.footer}>
        <div className={styles.images}>
          {imagesOrder()?.images?.map((item, idx) => (
            <div key={idx} className={clsx(styles.image, idx === 5 && styles.last)}>
              <img src={item} alt={item}/>
              {idx === 5 && <span>{imagesOrder().totalImages - 5}+</span>}
            </div>
          ))}
        </div>
        <div className={styles.price}>
          <div className={styles.count}>{order?.ingredients && reduceIngredients(burgerItems, order.ingredients)}</div>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
};

export default TapeCard;