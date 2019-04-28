import React from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import './App.scss';
import { default as TournamentHome } from './Tournament/Home';
import { default as UserHome } from './User/Home';


const Index: React.FC = () => {
  return (
    <div>
      <h1>Index</h1>
      <Link to="/secretaria-esportes-poa">Secretaria Municipal de Esportes</Link>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <nav>Nav</nav>
      <section className="section">
        <div className="container">
          <Route exact path="/" component={Index} />
          <Route exact path={`/:userId`} component={UserHome} />
          <Route exact path={`/:userId/:tournamentId`} component={TournamentHome} />
        </div>
      </section>
    </Router>
  );
}

export default App;
