import React from 'react';
import './App.scss';
import Schedule from './Tournament/Schedule';

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
