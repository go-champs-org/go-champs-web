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
import TournamentEdit from './Pages/TournamentEdit';
import TournamentHome from './Pages/TournamentHome';
import TournamentNew from './Pages/TournamentNew';
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
                  path="/:organizationSlug/:tournamentSlug"
                  component={TournamentHome}
                />
                <Route
                  exact
                  sensitive
                  path="/:organizationSlug/:tournamentSlug/TournamentEdit"
                  component={TournamentEdit}
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
