import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './Pages/Home';
import OrganizationEdit from './Pages/OrganizationEdit';
import OrganizationHome from './Pages/OrganizationHome';
import TournamentEdit from './Pages/TournamentEdit';
import TournamentGroupEdit from './Pages/TournamentGroupEdit';
import TournamentHome from './Pages/TournamentHome';
import TournamentTeamEdit from './Pages/TournamentTeamEdit';
import NavBar from './Shared/NavBar';
import store from './store';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<NavBar />
				<section className="section">
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact sensitive path="/Edit" component={OrganizationEdit} />
							<Route exact path="/:organizationSlug" component={OrganizationHome} />
							<Route exact sensitive path="/:organizationSlug/Edit" component={TournamentEdit} />
							<Route exact path="/:organizationSlug/:tournamentSlug" component={TournamentHome} />
							<Route exact sensitive path="/:organizationSlug/:tournamentSlug/TournamentTeamEdit" component={TournamentTeamEdit} />
							<Route exact sensitive path="/:organizationSlug/:tournamentSlug/TournamentGroupEdit" component={TournamentGroupEdit} />
						</Switch>
					</div>
				</section>
			</Router>
		</Provider>
	);
}

export default App;
