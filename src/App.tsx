import React from 'react';
import logo from './logo.svg';
import Schedule from './Tournament/Schedule';
import './App.scss';

const App: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          Hello World
        </h1>
        <Schedule />
      </div>
    </section>
  );
}

export default App;
