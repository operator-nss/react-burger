import {Dispatch, FC, KeyboardEvent, SetStateAction, useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import clsx from "clsx";
import ModalOverlay from "./ModalOverlay/ModalOverlay/ModalOverlay";
import './modal.scss'

import OrderDetails from "./OrderDetails/OrderDetails";
import IngredientDetails from "./IngredientDetails/IngredientDetails";
import {IBurger} from "../../types/types";


const modalRoot = document.getElementById('react-modals');

interface IModal {
  order: boolean
  setOrder: (value: boolean) => void
  openModal: boolean
  setOpenModal: (value: boolean) => void
  selectIngredient: IBurger | null
  setSelectIngredient: Dispatch<SetStateAction<IBurger | null>>
}

const Modal: FC<IModal> = ({order, setOrder, openModal, setOpenModal, selectIngredient, setSelectIngredient}) => {
  const [hoverClose, setHoverClose] = useState(false);

  const closeModal = useCallback(() => {
    setOpenModal(false)
    setOrder(false)
    setSelectIngredient(null)
  }, [setOpenModal, setOrder, setSelectIngredient])

  const escButtonHandle = useCallback((e: KeyboardEvent<Document>): void => {
    if (e.keyCode === 27) {
      closeModal();
    }
  }, [closeModal])

  useEffect(() => {
    if (openModal || order) {
      document.addEventListener("keydown", escButtonHandle as any);
    }
    return () => {
      document.removeEventListener("keydown", escButtonHandle as any);
    }
  }, [openModal, order, escButtonHandle])

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

        {selectIngredient && <IngredientDetails selectIngredient={selectIngredient}/>}

        {order && <OrderDetails/>}

      </div>
    </ModalOverlay>

    , modalRoot as HTMLElement)
}

export default Modal;