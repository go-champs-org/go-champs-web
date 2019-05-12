import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Home from './Pages/Home';
import OrganizationHome from './Pages/OrganizationHome';
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
            <Route exact path="/:organizationId" component={OrganizationHome} />
          </div>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
