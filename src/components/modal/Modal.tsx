import {FC, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import clsx from "clsx";
import {useSelector} from "react-redux";

import ModalOverlay from "./ModalOverlay/ModalOverlay/ModalOverlay";

import OrderDetails from "./OrderDetails/OrderDetails";
import IngredientDetails from "./IngredientDetails/IngredientDetails";
import {RootState, useAppDispatch} from "../../services/store";
import {setChosenIngredient} from "../../services/slices/info-ingredient.slice";
import './modal.scss'
import {setModal} from "../../services/slices/burgers.slice";
import {setOrder} from "../../services/slices/order.slice";


const modalRoot = document.getElementById('react-modals');

const Modal: FC = () => {
  const [hoverClose, setHoverClose] = useState(false);
  const dispatch = useAppDispatch();
  const {chosenIngredient} = useSelector((state: RootState) => state.info)
  const {openModal} = useSelector((state: RootState) => state.burgers)
  const {isOrder} = useSelector((state: RootState) => state.order)

  const closeModal = useCallback(() => {
    dispatch(setModal(false))
    dispatch(setOrder(false))
    dispatch(setChosenIngredient(null))
  }, [dispatch])

  const escButtonHandle = useCallback((e: KeyboardEvent<Document>): void => {
    if (e.keyCode === 27) {
      closeModal();
    }
  }, [closeModal])

  useEffect(() => {
    if (openModal || isOrder) {
      document.addEventListener("keydown", escButtonHandle as any);
    }
    return () => {
      document.removeEventListener("keydown", escButtonHandle as any);
    }
  }, [openModal, isOrder, escButtonHandle])

  return ReactDOM.createPortal(
    <ModalOverlay openModal={openModal} closeModal={closeModal}>
      <div className={clsx("modal", {open: openModal})}>
        <div
          role="presentation"
          className="modal-close"
          onMouseOver={() => setHoverClose(true)}
          onMouseLeave={() => setHoverClose(false)}
          onClick={closeModal}
        >
          <CloseIcon type={!hoverClose ? "primary" : 'success'}/>
        </div>

        {chosenIngredient && <IngredientDetails selectIngredient={chosenIngredient}/>}

        {isOrder && <OrderDetails/>}

      </div>
    </ModalOverlay>

    , modalRoot as HTMLElement)
}

export default Modal;