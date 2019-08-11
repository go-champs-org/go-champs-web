import React from 'react';

const NavTopToolbar: React.FC = () => (
	<nav
		className="navbar is-fixed-top"
		role="navigation"
		aria-label="dropdown navigation"
	>
		<div className="navbar-item">
			<img
				src="https://bulma.io/images/bulma-logo.png"
				alt="Bulma: Free"
				width="112"
				height="28"
			/>
		</div>

		<div className="navbar-end">
			<a href="/about.html" className="navbar-item">
				Yo Champs!
		</a>

			<a href="/about.html" className="navbar-item">
				Sobre nós
		</a>
		</div>
	</nav>
);

export default NavTopToolbar;