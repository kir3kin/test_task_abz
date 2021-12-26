import React from 'react'
import { useAppDispatch } from '../redux/hooks'
import { toggleSideMenu } from '../redux/reducers/appSlice'

import '@scss/components/MenuSidebar'
import '@scss-media/components/MenuSidebar'

const HeaderMenuSidebar: React.FC = () => {
	const dispatch = useAppDispatch()

	return (
		<section className="menu-sidebar">
			<div
				onClick={() => dispatch(toggleSideMenu())}
				className="menu-sidebar__close"
			></div>
			<div className="menu-sidebar__content">
				<a className="menu-sidebar__logo" href="/"></a>
				<nav className="menu-sidebar__nav">
					<a className="menu-sidebar__nav__link" href="#register">About me</a>
					<a className="menu-sidebar__nav__link" href="#register">Relationship</a>
					<a className="menu-sidebar__nav__link" href="#register">Users</a>
					<a className="menu-sidebar__nav__link" href="#register">Sign up</a>
					<a className="menu-sidebar__nav__link" href="#register">Terms and Conditions</a>
				</nav>
				<nav className="menu-sidebar__nav">
					<a className="menu-sidebar__nav__link" href="#about-me">How it works</a>
					<a className="menu-sidebar__nav__link" href="#register">Partnership</a>
					<a className="menu-sidebar__nav__link" href="#register">Help</a>
					<a className="menu-sidebar__nav__link" href="#register">Level testimonial</a>
					<a className="menu-sidebar__nav__link" href="#register">Contact us</a>
				</nav>
				<nav className="menu-sidebar__nav">
					<a className="menu-sidebar__nav__link"  href="#register">Articles</a>
					<a className="menu-sidebar__nav__link" href="#register">Our news</a>
					<a className="menu-sidebar__nav__link" href="#register">Testimonials</a>
					<a className="menu-sidebar__nav__link" href="#register">Licenses</a>
					<a className="menu-sidebar__nav__link" href="#register">Privacy Policy</a>
				</nav>
			</div>
		</section>
	)
}

export default HeaderMenuSidebar