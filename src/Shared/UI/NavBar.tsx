import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC<{
	title: string;
	titleUrl: string;
}> = ({ title, titleUrl }) => (
	<nav className="level">
		<div className="level-left">
			<div className="level-item">
				<Link to={`/${titleUrl}`}>
					<h1 className="title">{title}</h1>
				</Link>
			</div>
		</div>
	</nav>
);

export default NavBar;
