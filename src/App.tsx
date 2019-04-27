import React from 'react';
import logo from './logo.svg';
import './App.scss';

const App: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          Hello World
        </h1>
        <p className="subtitle">
          My first website with <strong>Bulma</strong>!
        </p>
      </div>
    </section>
  );
}

export default App;
