import React from "react"

import '@scss/components/Banner'
import '@scss-media/components/Banner'

export const Banner: React.FC = () => (
	<section className="wrapper wrapper--banner">
		<div className="container">
			<div className="banner">
				<div className="banner__content">
					<h1 className="banner__title">Test assignment for front-end developers</h1>
					<div className="banner__desc">
						<p>Front-end developers make sure the user sees and interacts with all the necessary elements to ensure conversion. Therefore, responsive design, programming languages and specific frameworks are the must-have skillsets to look for when assessing your front-end developers.</p>
					</div>
					<a href="#register" className="button" type="button">Sign up</a>
				</div>
			</div>
		</div>
	</section>
)