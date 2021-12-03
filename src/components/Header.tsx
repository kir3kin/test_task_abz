import React from "react"
import { useAppDispatch } from "../redux/hooks"
import { toggleSideMenu } from "../redux/reducers/appSlice"

export const Header: React.FC = () => {
	const dispatch = useAppDispatch()

	return (
		// delete wrapper--fixed class to check Styles in PixelPerfect
		<section className="wrapper wrapper--header wrapper--fixed">
			<div className="container">
				<header className="header">
					<a className="header__logo" href="/"></a>
					<nav className="header__nav">
						<a className="header__nav__link" href="#register" >About me</a>
						<a className="header__nav__link" href="#register" >Relationships</a>
						<a className="header__nav__link" href="#register" >Requirements</a>
						<a className="header__nav__link" href="#register" >Users</a>
						<a className="header__nav__link" href="#register" >Sign Up</a>
					</nav>
					<div
						onClick={() => dispatch(toggleSideMenu())}
						className="burger-menu"
					></div>
				</header>
			</div>
		</section>
	)
}