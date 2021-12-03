import React from "react"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getNextUsers, selectAppInfo, selectUsersInfo } from "../redux/reducers/appSlice"

import { UserCard } from "./blocs/UserCard"
import { Preloader } from "./blocs/Preloader"

import { TransitionGroup, CSSTransition } from "react-transition-group"

export const Cheerful: React.FC = () => {
	const dispatch = useAppDispatch()
  const { users, status } = useAppSelector(selectUsersInfo)
	const { lastPage: hideButton } = useAppSelector(selectAppInfo)

	return (
		<section className="wrapper">
			<div className="container">
				<div className="cheerful">
					<h2 className="cheerful__title">Our cheerful users</h2>
					<h3 className="cheerful__subtitle">The best specialists are shown below</h3>
					{status === 'loading' && <Preloader />}
					{status === 'failed' && <p>Something went wrong...</p>}
					{status === 'idle' && (
						users.length > 0 ? (
							<>
								<TransitionGroup
									component="ul"
									className="cheerful__list"
								>
									{users.map(user => (
										<CSSTransition
											key={user.id}
											timeout={800}
											classNames={'card-item'}
										>
											<UserCard user={user} />
										</CSSTransition>
									))}
								</TransitionGroup>
								{!hideButton && (
									<button
										type="button"
										className="button"
										onClick={() => dispatch(getNextUsers())}
									>Show more</button>
								)}
							</>
						) : (<p>Users are not found!</p>)
					)}
				</div>
			</div>
		</section>
	)
}