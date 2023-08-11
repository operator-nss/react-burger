import clsx from "clsx";
import './modal-overlay.scss'
import {FC, ReactNode, SyntheticEvent} from "react";

interface IModalOverlay {
	openModal: boolean
	closeModal: () => void
  children: ReactNode
}

const ModalOverlay:FC<IModalOverlay> = ({children, openModal, closeModal}) => {

	const closeOverlay = (e:SyntheticEvent):void => {
		if (e.target === e.currentTarget) {
			closeModal()
		}
	 }

	return (
		<div
			role="presentation"
			onClick={closeOverlay}
			className={clsx("overlay", {open: openModal})}
			data-test='overlay'
		>
			{children}
		</div>
	);
};

export default ModalOverlay;
