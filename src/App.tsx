import React from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.scss';
import { fetchOrganizations } from './Organizations/actions';
import store from './store';
import { default as TournamentHome } from './Tournament/Home';
import { default as UserHome } from './User/Home';

interface DispatchFromProps {
  dispatch: (func: any) => void;
}

class OrganizationList extends React.Component<DispatchFromProps> {
  render() {
    return (
      <div>
        <h1>Index</h1>
        <Link to="/secretaria-esportes-poa">Secretaria Municipal de Esportes</Link>
      </div>
    );
  }

  componentDidMount() {
    console.log('arroz', this.props)
    const f = fetchOrganizations();
    this.props.dispatch(fetchOrganizations());
  }
}

const Index = connect<any, DispatchFromProps>(state => state)(OrganizationList);

const NavBar: React.FC = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">
            Home
      </a>

          <a className="navbar-item">
            Documentation
      </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              More
        </a>

            <div className="navbar-dropdown">
              <a className="navbar-item">
                About
          </a>
              <a className="navbar-item">
                Jobs
          </a>
              <a className="navbar-item">
                Contact
          </a>
              <hr className="navbar-divider" />
              <a className="navbar-item">
                Report an issue
                </a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">
                Log in
          </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <section className="section">
          <div className="container">
            <Route exact path="/" component={Index} />
            <Route exact path={`/:userId`} component={UserHome} />
            <Route exact path={`/:userId/:tournamentId`} component={TournamentHome} />
          </div>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
