import React from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { selectError, toggleModal } from "../redux/reducers/appSlice"

export const Modal: React.FC = () => {
	const dispatch = useAppDispatch()
	const { error } = useAppSelector(selectError)

	const DefaultValues = {
		errorTitle: 'An error occurred!',
		title: 'Congratulations',
		text: 'You have successfully passed the registration'
	}

	// I've decided to left a Button Value the same :)
	return (
		<div className="modal">
			<div className="modal__content">
				<div className="modal__title">{error ? DefaultValues.errorTitle : DefaultValues.title }</div>
				<div className="modal__text">{error ? error : DefaultValues.text}</div>
				<button
					onClick={() => dispatch(toggleModal())}
					className="button"
				>
					Great
				</button>
			</div>
		</div>
	)
}