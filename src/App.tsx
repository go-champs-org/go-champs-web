import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './Pages/Home';
import OrganizationEdit from './Pages/OrganizationEdit';
import OrganizationHome from './Pages/OrganizationHome';
import OrganizationNew from './Pages/OrganizationNew';
import TournamentEdit from './Pages/TournamentEdit';
import TournamentGameEdit from './Pages/TournamentGameEdit';
import TournamentGameList from './Pages/TournamentGameList';
import TournamentGameNew from './Pages/TournamentGameNew';
import TournamentGroupEdit from './Pages/TournamentGroupEdit';
import TournamentGroupList from './Pages/TournamentGroupList';
import TournamentGroupNew from './Pages/TournamentGroupNew';
import TournamentHome from './Pages/TournamentHome';
import TournamentNew from './Pages/TournamentNew';
import TournamentPhaseList from './Pages/TournamentPhaseList';
import TournamentStandingsEdit from './Pages/TournamentStandingsEdit';
import TournamentStatEdit from './Pages/TournamentStatEdit';
import TournamentStatList from './Pages/TournamentStatList';
import TournamentStatNew from './Pages/TournamentStatNew';
import TournamentTeamEdit from './Pages/TournamentTeamEdit';
import TournamentTeamList from './Pages/TournamentTeamList';
import TournamentTeamNew from './Pages/TournamentTeamNew';
import NavTopToolbar from './Shared/UI/NavTopToolbar';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavTopToolbar />
        <section className="section">
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact sensitive path="/New" component={OrganizationNew} />
              <Route
                exact
                path="/:organizationSlug"
                component={OrganizationHome}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/OrganizationEdit"
                component={OrganizationEdit}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/TournamentNew"
                component={TournamentNew}
              />
              <Route
                exact
                path="/:organizationSlug/:tournamentSlug"
                component={TournamentHome}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentEdit"
                component={TournamentEdit}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentGameList"
                component={TournamentGameList}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentGameNew"
                component={TournamentGameNew}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentGameEdit/:tournamentGameId"
                component={TournamentGameEdit}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentGroupEdit/:tournamentGroupId"
                component={TournamentGroupEdit}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentGroupList"
                component={TournamentGroupList}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentGroupNew"
                component={TournamentGroupNew}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentPhaseList"
                component={TournamentPhaseList}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentStandingsEdit"
                component={TournamentStandingsEdit}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentStatEdit/:tournamentStatId"
                component={TournamentStatEdit}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentStatList"
                component={TournamentStatList}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentStatNew"
                component={TournamentStatNew}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentTeamEdit/:tournamentTeamId"
                component={TournamentTeamEdit}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentTeamList"
                component={TournamentTeamList}
              />
              <Route
                exact
                sensitive
                path="/:organizationSlug/:tournamentSlug/TournamentTeamNew"
                component={TournamentTeamNew}
              />
            </Switch>
          </div>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
