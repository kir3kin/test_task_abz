import React from "react"

export const Acquainted: React.FC = () => (
	<section className="wrapper">
		<div className="container">
			<div className="acquainted">
				<div className="acquainted__img"></div>
				<div className="acquainted__content">
					<h2 className="acquainted__title">Let's get acquainted</h2>
					<h3 className="acquainted__subtitle">I'm a good front-end developer</h3>
					<div className="acquainted__desc">
						<p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
					</div>
					<a href="#register" className="button" type="button">Sign up</a>
				</div>
			</div>
		</div>
	</section>
)
