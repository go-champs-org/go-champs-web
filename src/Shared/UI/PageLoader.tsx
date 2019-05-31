import React from 'react';
import './PageLoader.scss';
import screenLoader from './screen-loader.gif';

const PageLoader: React.FC = () => {
	return (
		<div className="page-loader">
			<img src={screenLoader} alt="Loading tournament"></img>
		</div>
	)
};

export default PageLoader;