import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './Pages/Home';
import OrganizationEdit from './Pages/OrganizationEdit';
import OrganizationHome from './Pages/OrganizationHome';
import OrganizationNew from './Pages/OrganizationNew';
import TournamentEdit from './Pages/TournamentEdit';
import TournamentGameNew from './Pages/TournamentGameNew';
import TournamentGroupEdit from './Pages/TournamentGroupEdit';
import TournamentGroupNew from './Pages/TournamentGroupNew';
import TournamentHome from './Pages/TournamentHome';
import TournamentNew from './Pages/TournamentNew';
import TournamentTeamEdit from './Pages/TournamentTeamEdit';
import TournamentTeamNew from './Pages/TournamentTeamNew';
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
							<Route exact sensitive path="/New" component={OrganizationNew} />
							<Route exact path="/:organizationSlug" component={OrganizationHome} />
							<Route exact sensitive path="/:organizationSlug/OrganizationEdit" component={OrganizationEdit} />
							<Route exact sensitive path="/:organizationSlug/TournamentNew" component={TournamentNew} />
							<Route exact path="/:organizationSlug/:tournamentSlug" component={TournamentHome} />
							<Route exact sensitive path="/:organizationSlug/:tournamentSlug/TournamentEdit" component={TournamentEdit} />
							<Route exact sensitive path="/:organizationSlug/:tournamentSlug/TournamentTeamEdit/:tournamentTeamId" component={TournamentTeamEdit} />
							<Route exact sensitive path="/:organizationSlug/:tournamentSlug/TournamentTeamNew" component={TournamentTeamNew} />
							<Route exact sensitive path="/:organizationSlug/:tournamentSlug/TournamentGroupEdit/:tournamentGroupId" component={TournamentGroupEdit} />
							<Route exact sensitive path="/:organizationSlug/:tournamentSlug/TournamentGroupNew" component={TournamentGroupNew} />
							<Route exact sensitive path="/:organizationSlug/:tournamentSlug/TournamentGameNew" component={TournamentGameNew} />yar
						</Switch>
					</div>
				</section>
			</Router>
		</Provider>
	);
}

export default App;
