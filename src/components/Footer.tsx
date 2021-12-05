import React from "react"

import '@scss/components/Footer'
import '@scss-media/components/Footer'

const Footer: React.FC = () => (
	<section className="wrapper wrapper--footer">
		<div className="container">
			<footer className="footer">
				<p className="footer__copy">© abz.agency specially for the test task</p>
			</footer>
		</div>
	</section>
)

export default Footer