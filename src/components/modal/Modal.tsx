import {FC, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import clsx from "clsx";
import {useSelector} from "react-redux";
import {useLocation, useNavigate, useNavigationType, useParams} from "react-router-dom";
import ModalOverlay from "./ModalOverlay/ModalOverlay/ModalOverlay";
import OrderDetails from "./OrderDetails/OrderDetails";
import IngredientDetails from "./IngredientDetails/IngredientDetails";
import {RootState, useAppDispatch} from "../../services/store";
import './modal.scss'
import {setModal} from "../../services/slices/burgers.slice";
import {setChosenIngredient} from "../../services/slices/info-ingredient.slice";
import OrderInfo from "../order-details/OrderInfo";

const modalRoot = document.getElementById('react-modals');

interface IModal {
  onClose: () => void
}

const Modal: FC<IModal> = ({onClose}) => {
  const [hoverClose, setHoverClose] = useState(false);
  const dispatch = useAppDispatch();
  const {chosenIngredient} = useSelector((state: RootState) => state.info)
  const {openModal, burgerItems} = useSelector((state: RootState) => state.burgers)
  const {isOrder, selectedOrder} = useSelector((state: RootState) => state.order)
  const params = useParams()
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const location = useLocation();

  const escButtonHandle = useCallback((e: KeyboardEvent<Document>): void => {
    if (e.keyCode === 27) {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if(params?.number && navigationType !== 'PUSH') {
      if(location.pathname.includes('/profile/orders')) {
        navigate(`/profile/orders/${params?.number}`)
      } else if(location.pathname.includes('/feed')) {
        navigate(`/feed/${params?.number}`)
      }
    }
    if(params?._id) {
      dispatch(setModal(true))
      const findIngredient = burgerItems?.find(item => item._id === params?._id)
      if(findIngredient) dispatch(setChosenIngredient(findIngredient))
    }
  }, [params, dispatch, burgerItems, navigationType, navigate, location])


  useEffect(() => {
    if (openModal || isOrder || selectedOrder) {
      document.addEventListener("keydown", escButtonHandle as any);
    }
    return () => {
      document.removeEventListener("keydown", escButtonHandle as any);
    }
  }, [openModal, isOrder, selectedOrder, escButtonHandle])

  return ReactDOM.createPortal(
    <ModalOverlay openModal={openModal} closeModal={onClose}>
      <div className={clsx("modal", {open: openModal})}>
        <div
          data-test='modal-close'
          role="presentation"
          className="modal-close"
          onMouseOver={() => setHoverClose(true)}
          onMouseLeave={() => setHoverClose(false)}
          onClick={onClose}
        >
          <CloseIcon type={!hoverClose ? "primary" : 'success'}/>
        </div>

        {chosenIngredient && <IngredientDetails selectIngredient={chosenIngredient}/>}

        {isOrder && <OrderDetails/>}
        {selectedOrder && <OrderInfo selectOrder={selectedOrder}/>}

      </div>
    </ModalOverlay>

    , modalRoot as HTMLElement)
}

export default Modal;