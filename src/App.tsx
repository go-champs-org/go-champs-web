import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Home from './Pages/Home';
import OrganizationHome from './Pages/OrganizationHome';
import TournamentHome from './Pages/TournamentHome';
import NavBar from './Shared/NavBar';
import store from './store';


const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<NavBar />
				<section className="section">
					<div className="container">
						<Route exact path="/" component={Home} />
						<Route exact path="/:organizationSlug" component={OrganizationHome} />
						<Route exact path="/:organizationSlug/:tournamentSlug" component={TournamentHome} />
					</div>
				</section>
			</Router>
		</Provider>
	);
}

export default App;
