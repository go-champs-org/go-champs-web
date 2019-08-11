import React from 'react';
import logo from '../../assets/logo-with-background.png';
import './NavTopToolbar.scss';

const NavTopToolbar: React.FC = () => (
	<nav
		className="navbar is-fixed-top"
		role="navigation"
		aria-label="dropdown navigation"
		style={{ height: '4rem' }}
	>
		<div className="navbar-brand">
			<div className="navbar-item">
				<img
					src={logo}
					alt="Yo Champs"
					className="logo"
				/>

				<h2 className="title">
					Yo Champs!
				</h2>
			</div>
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