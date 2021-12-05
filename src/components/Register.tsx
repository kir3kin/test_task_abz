import React, { useEffect, useMemo } from "react"

import { Modal } from "./Modal"
import { Preloader } from "../blocs/Preloader"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getPositions, getToken, registerUser, selectAppInfo, selectError, selectPositionsInfo } from "../redux/reducers/appSlice"

import { HELPER_TEXT } from "../utils/consts"
import { getPositionFor, returnClassName } from "../utils/servises"
import { validationSchema } from "../utils/schema"

import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { fileInfoType, iForm } from "../interfaces/register.interface"

import '@scss/components/Register'
import '@scss/blocs/RegisterInput'
import '@scss/blocs/RadioButtons'
import '@scss/blocs/RegisterFile'
import '@scss-media/components/Register'

const Register: React.FC = () => {
	const dispatch = useAppDispatch()
	const { positions, status } = useAppSelector(selectPositionsInfo)
	const { showModal } = useAppSelector(selectAppInfo)// After registration
	const { error: registerError } = useAppSelector(selectError)

  useEffect(()=> {
		// fetching token and positions respectively
		if (Object.keys(positions).length === 0) dispatch(getPositions())
	}, [dispatch])

	// ::: [START:] Default Values ::: \\
	const DefaultfileName: string = 'Upload your photo'
	// ::: [END:] Default Values ::: \\

	// useForm hook from "React Hook Form" plugin
	const {
		register, handleSubmit, watch, formState: { errors }, reset
	} = useForm({ resolver: yupResolver(validationSchema) })


	// ::: [START:] Watching changes in form ::: \\
	// instead of useState, using function watch() - which re-renders local component, in case of changing input value
	const watchAll = watch()
	const watchPhoto = watch('photo')

	// to control input[type="file"] label's name
	const fileInfo: fileInfoType = useMemo(() => {
		return (watchPhoto && watchPhoto.length > 0) ?
		({ fileName: watchPhoto[0].name, isEmpty: false }) :
		({ fileName: DefaultfileName, isEmpty: true })
	}, [watchPhoto])
	
	// show form button "Sign up" only if each form input has a value
	const enabled = useMemo(() => {
		if (Object.keys(watchAll).length === 0) return false
		return Object.keys(watchAll).every(key => {
			if (key === 'photo') return !!watchAll[key].length
			return !!watchAll[key]
		})
	}, [watchAll])
	// ::: [END:] Watching changes in form ::: \\


	// ::: [START:] Form handlers ::: \\
	const onSubmit: SubmitHandler<iForm> = (data) => {
		dispatch(getToken())
		const sendData = new FormData()
		sendData.append('name', data.name)
		sendData.append('email', data.email)
		sendData.append('phone', data.phone)
		sendData.append('position_id', data.position_id)
		sendData.append('photo', data.photo[0])
		dispatch(registerUser(sendData))
		reset()
	}
	// ::: [END:] Form handlers ::: \\

	return (
		<section className="wrapper wrapper--register">
			<div className="container" >
				<div className="register" id="register">
					<h2 className="register__title">Register to get a work</h2>
					<h3 className="register__subtitle">Your personal data is stored according to the Privacy Policy</h3>

					<form
						className="register__form"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
					>
						<div className="register__inputs">

							<div className={returnClassName('register__input', errors.name)}>
								<input
								{ ...register("name") }
									placeholder="Your name"
									id="name"
								/>
								<label htmlFor="name">Your name</label>
								<span>{HELPER_TEXT.name}</span>
							</div>

							<div className={returnClassName('register__input', errors.email)}>
								<input
									{ ...register("email") }
									placeholder="Email"
									type="email"
									id="email"
									/>
								<label htmlFor="email">Email</label>
								<span>{HELPER_TEXT.email}</span>
							</div>

							<div className={returnClassName('register__input', errors.phone)}>
								<input
									{ ...register("phone") }
									placeholder="Phone"
									type="tel"
									id="phone"
								/>
								<label htmlFor="phone">Phone</label>
								<span>{HELPER_TEXT.phone}</span>
							</div>

							<div className="register__radio radio__buttons">
								<p className="radio__header">Select your position</p>
								{status === 'loading' && <Preloader />}
								{status === 'failed' && <p>{registerError}</p>}
								{status === 'idle' && (
									positions.length > 0 ? (
										positions.map(position => (
											<div className="radio__button" key={position.id}>
												<input
													{ ...register("position_id") }
													type="radio"
													id={getPositionFor(position.name)}
													value={position.id}
												/>
												<label htmlFor={getPositionFor(position.name)} >
													{position.name}
												</label>
											</div>
										))
									) : (
										<p>Positions are not found!</p>
									)
								)}
							</div>

							<div className={returnClassName('register__file', errors.photo, fileInfo.isEmpty)}>
								<input
									{ ...register("photo") }
									id="photo"
									type="file"
									required
								/>
								<label htmlFor="photo">{fileInfo.fileName}</label>
								{errors.photo && (<span>{errors.photo.message}</span>)}
							</div>

						</div>{/* .close/register__inputs */}

						<button
							className="button"
							type="submit"
							disabled={!enabled}
						>Sign up</button>

					</form>

				</div>
			</div>
			{showModal && <Modal />}
		</section>
	)
}

export default Register