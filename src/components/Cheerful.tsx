import React, { useEffect, useMemo } from "react"
import { useMediaQuery } from "react-responsive"

import { UserCard } from "./blocs/UserCard"
import { Preloader } from "./blocs/Preloader"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getNextUsers, getUsers, selectAppInfo, selectUsersInfo, setCount } from "../redux/reducers/appSlice"

import { TransitionGroup, CSSTransition } from "react-transition-group"

import { USERS_COUNT, WITDH_MOBILE, WITDH_TABLET } from "../utils/consts"

export const Cheerful: React.FC = () => {
	const dispatch = useAppDispatch()
  const { users, status } = useAppSelector(selectUsersInfo)
	const { lastPage: hideButton } = useAppSelector(selectAppInfo)

 // ::: [START:] screen size check ::: \\
	const tablet = useMediaQuery({ query: WITDH_TABLET})
	const mobile = useMediaQuery({ query: WITDH_MOBILE})

	// @count - amount of users which will be downloaded per one request
	const count = useMemo(() => {
		return tablet ? ( mobile ? (USERS_COUNT.mobile) : (USERS_COUNT.tablet) ) : (USERS_COUNT.desktop)
	}, [tablet, mobile])
// ::: [END:] screen size check ::: \\

  useEffect(()=> {
    // set number of downloading users, before fetching them
    dispatch(setCount(count))
    // fetching users 
    dispatch(getUsers(false))
  }, [dispatch])


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