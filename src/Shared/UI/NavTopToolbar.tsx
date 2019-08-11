import React from 'react';
import logo from '../../assets/logo-with-background.png';
import './NavTopToolbar.scss';

class NavTopToolbar extends React.Component {
	render() {
		return (
			<nav
				className="navbar is-fixed-top"
				role="navigation"
				aria-label="dropdown navigation"
			>
				<div className="navbar-brand">
					<div className="navbar-item">
						<img src={logo} alt="Yo Champs" className="logo" />

						<h2 className="title">Yo Champs!</h2>
					</div>

					<a
						role="button"
						className="navbar-burger burger"
						aria-label="menu"
						aria-expanded="false"
						data-target="menu"
					>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>

				<div id="menu" className="navbar-menu">
					<div className="navbar-end">
						<a href="/about.html" className="navbar-item">
							Yo Champs!
            </a>

						<a href="/about.html" className="navbar-item">
							Sobre nós
            </a>
					</div>
				</div>
			</nav>
		);
	}

	componentDidMount() {
		const $navbarBurgers = Array.prototype.slice.call(
			document.querySelectorAll('.navbar-burger'),
			0
		);

		if ($navbarBurgers.length > 0) {
			$navbarBurgers.forEach(el => {
				el.addEventListener('click', () => {
					const target = el.dataset.target;
					const menu = document.getElementById(target);

					el.classList.toggle('is-active');
					menu!.classList.toggle('is-active');
				});
			});
		}
	}
}

export default NavTopToolbar;
