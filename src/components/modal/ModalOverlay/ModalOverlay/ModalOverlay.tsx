import clsx from "clsx";
import './modal-overlay.scss'
import {FC, SyntheticEvent} from "react";

interface IModalOverlay {
	openModal: boolean
	closeModal: () => void
  children: any
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
		>
			{children}
		</div>
	);
};

export default ModalOverlay;
