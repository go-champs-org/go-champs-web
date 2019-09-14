import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './Pages/Home';
import OrganizationEdit from './Pages/OrganizationEdit';
import OrganizationHome from './Pages/OrganizationHome';
import OrganizationNew from './Pages/OrganizationNew';
import PhaseGameEdit from './Pages/PhaseGameEdit';
import PhaseGameList from './Pages/PhaseGameList';
import PhaseGameNew from './Pages/PhaseGameNew';
import PhaseGroupEdit from './Pages/PhaseGroupEdit';
import PhaseGroupList from './Pages/PhaseGroupList';
import PhaseGroupNew from './Pages/PhaseGroupNew';
import PhaseStandingsEdit from './Pages/PhaseStandingsEdit';
import PhaseStatEdit from './Pages/PhaseStatEdit';
import PhaseStatList from './Pages/PhaseStatList';
import PhaseStatNew from './Pages/PhaseStatNew';
import TournamentEdit from './Pages/TournamentEdit';
import TournamentHome from './Pages/TournamentHome';
import TournamentNew from './Pages/TournamentNew';
import TournamentPhaseEdit from './Pages/TournamentPhaseEdit';
import TournamentPhaseList from './Pages/TournamentPhaseList';
import TournamentPhaseNew from './Pages/TournamentPhaseNew';
import TournamentTeamEdit from './Pages/TournamentTeamEdit';
import TournamentTeamList from './Pages/TournamentTeamList';
import TournamentTeamNew from './Pages/TournamentTeamNew';
import NavTopToolbar from './Shared/UI/NavTopToolbar';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <DndProvider backend={HTML5Backend}>
          <NavTopToolbar />
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  sensitive
                  path="/New"
                  component={OrganizationNew}
                />
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
                  path="/:organizationSlug/:tournamentSlug/phase/:phaseId"
                  component={TournamentHome}
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
                <Route
                  exact
                  sensitive
                  path="/:organizationSlug/:tournamentSlug/TournamentPhaseEdit/:tournamentPhaseId"
                  component={TournamentPhaseEdit}
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
                  path="/:organizationSlug/:tournamentSlug/TournamentPhaseNew"
                  component={TournamentPhaseNew}
                />
                <Route
                  exact
                  sensitive
                  path="/:organizationSlug/:tournamentSlug/phase/:phaseId/PhaseGameList"
                  component={PhaseGameList}
                />
                <Route
                  exact
                  sensitive
                  path="/:organizationSlug/:tournamentSlug/phase/:phaseId/PhaseGameNew"
                  component={PhaseGameNew}
                />
                <Route
                  exact
                  sensitive
                  path="/:organizationSlug/:tournamentSlug/phase/:phaseId/PhaseGameEdit/:tournamentGameId"
                  component={PhaseGameEdit}
                />
                <Route
                  exact
                  sensitive
                  path="/:organizationSlug/:tournamentSlug/phase/:phaseId/PhaseGroupEdit/:tournamentGroupId"
                  component={PhaseGroupEdit}
                />
                <Route
                  exact
                  sensitive
                  path="/:organizationSlug/:tournamentSlug/phase/:phaseId/PhaseGroupList"
                  component={PhaseGroupList}
                />
                <Route
                  exact
                  sensitive
                  path="/:organizationSlug/:tournamentSlug/phase/:phaseId/PhaseGroupNew"
                  component={PhaseGroupNew}
                />
                <Route
                  exact
                  sensitive
                  path="/:organizationSlug/:tournamentSlug/phase/:phaseId/PhaseStandingsEdit"
                  component={PhaseStandingsEdit}
                />
                <Route
                  exact
                  sensitive
                  path="/:organizationSlug/:tournamentSlug/phase/:phaseId/PhaseStatEdit/:tournamentStatId"
                  component={PhaseStatEdit}
                />
                <Route
                  exact
                  sensitive
                  path="/:organizationSlug/:tournamentSlug/phase/:phaseId/PhaseStatList"
                  component={PhaseStatList}
                />
                <Route
                  exact
                  sensitive
                  path="/:organizationSlug/:tournamentSlug/phase/:phaseId/PhaseStatNew"
                  component={PhaseStatNew}
                />
              </Switch>
            </div>
          </section>
        </DndProvider>
      </Router>
    </Provider>
  );
};

export default App;
