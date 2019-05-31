import React, { ReactNode } from 'react';
import './PageLoader.scss';
import screenLoader from './screen-loader.gif';

interface PageLoaderProps {
	canRender: boolean;
	children: ReactNode;
}

const PageLoader: React.FC<PageLoaderProps> = ({ canRender, children }) => {
	if (canRender) {
		return (
			<div>
				{children}
			</div>
		);
	}

	return (
		<div className="page-loader">
			<img src={screenLoader} alt="Loading tournament"></img>
		</div>
	);
};

export default PageLoader;